# Partes Importantes del Código — BancoConfianza

**Autor:** Angel Addair Jeremias Avellaneda  
**Proyecto:** Home Banking — React + Spring Boot + Supabase

---

## BACKEND — Spring Boot

---

### 1. Configuración de Seguridad (`SecurityConfig.java`)

Este es el archivo más importante del backend. Define qué rutas son públicas, cuáles requieren autenticación, cómo se configura CORS y en qué orden se ejecutan los filtros.

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(AbstractHttpConfigurer::disable)
            .headers(h -> h.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin))
            .authorizeHttpRequests(auth -> auth
                // Preflight CORS — OPTIONS siempre libre
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // Rutas públicas
                .requestMatchers(
                    "/api/auth/**",
                    "/api/public/**",
                    "/actuator/health",
                    "/h2-console/**"
                ).permitAll()
                // Todo lo demás requiere JWT válido
                .anyRequest().authenticated()
            )
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
```

**Puntos clave:**
- `STATELESS` — no se usan sesiones HTTP, cada request debe traer su JWT
- `OPTIONS` libre — necesario para que el navegador pueda hacer el preflight CORS antes del POST
- `addFilterBefore` — el `JwtAuthFilter` se ejecuta antes que el filtro de usuario/contraseña estándar de Spring

---

### 2. Configuración de CORS

CORS (Cross-Origin Resource Sharing) permite que el frontend en `localhost:5173` pueda llamar al backend en `localhost:8080`. Sin esto, el navegador bloquea todas las peticiones.

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(corsProperties.getAllowedOrigins()); // localhost:5173
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setExposedHeaders(List.of("Authorization"));
    config.setAllowCredentials(false);
    config.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}
```

Los orígenes permitidos se leen desde `application.properties`:
```properties
app.cors.allowed-origins=http://localhost:5173,http://localhost:3000
```

---

### 3. Filtro JWT (`JwtAuthFilter.java`)

Se ejecuta en cada request HTTP. Lee el header `Authorization`, extrae el token, lo valida y si es válido establece la autenticación en el contexto de Spring Security.

```java
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        // Si no hay header Bearer, pasa al siguiente filtro sin autenticar
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7); // quita "Bearer "
        final String userEmail;

        try {
            userEmail = jwtService.extractUsername(jwt);
        } catch (Exception e) {
            filterChain.doFilter(request, response);
            return;
        }

        // Si el email es válido y no hay autenticación previa, autentica
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                var authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
```

**Flujo:**
```
Request llega → JwtAuthFilter → extrae JWT del header
    → JwtService.extractUsername() → obtiene email
    → JwtService.isTokenValid() → verifica firma RS256 con JWKS de Supabase
    → Si válido → establece autenticación en SecurityContext
    → Continúa al Controller
```

---

### 4. Servicio JWT con validación Supabase RS256 (`JwtService.java`)

Esta es la parte más técnica del proyecto. Supabase firma sus tokens con el algoritmo **RS256** (clave privada/pública RSA). El backend descarga la clave pública desde el endpoint JWKS de Supabase y la usa para verificar la firma.

#### 4.1 Detectar si el token es de Supabase

```java
private boolean isSupabaseToken(String token) {
    try {
        // Decodifica el header del JWT (primera parte antes del primer punto)
        String headerJson = new String(
            Base64.getUrlDecoder().decode(token.split("\\.")[0]),
            StandardCharsets.UTF_8
        );
        JsonNode header = mapper.readTree(headerJson);
        // Si el algoritmo es RS256, es un token de Supabase
        return "RS256".equals(header.path("alg").asText());
    } catch (Exception e) {
        return false;
    }
}
```

#### 4.2 Descargar y cachear claves públicas JWKS

```java
private PublicKey getPublicKey(String kid) {
    // Si ya está en caché, devuelve directamente
    if (jwksCache.containsKey(kid)) return jwksCache.get(kid);

    // Descarga el JWKS desde Supabase
    String jwksUrl = supabaseUrl + "/auth/v1/.well-known/jwks.json";
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(jwksUrl))
        .GET().build();
    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

    // Parsea las claves y las guarda en caché
    JsonNode jwks = mapper.readTree(response.body());
    for (JsonNode key : jwks.path("keys")) {
        String keyId = key.path("kid").asText();
        PublicKey pk = buildRsaPublicKey(
            key.path("n").asText(),  // módulo RSA
            key.path("e").asText()   // exponente RSA
        );
        jwksCache.put(keyId, pk);
    }
    return jwksCache.get(kid);
}
```

#### 4.3 Construir la clave pública RSA desde los parámetros JWKS

```java
private PublicKey buildRsaPublicKey(String n, String e) throws Exception {
    BigInteger modulus  = new BigInteger(1, Base64.getUrlDecoder().decode(n));
    BigInteger exponent = new BigInteger(1, Base64.getUrlDecoder().decode(e));
    return KeyFactory.getInstance("RSA")
                     .generatePublic(new RSAPublicKeySpec(modulus, exponent));
}
```

**Por qué es importante:** sin esta verificación, cualquiera podría fabricar un JWT falso y acceder al backend. La firma RS256 garantiza que el token fue emitido por Supabase y no fue modificado.

---

### 5. Controlador de Cuentas (`CuentaController.java`)

Expone los endpoints REST para consultar cuentas y movimientos. Usa `@AuthenticationPrincipal` para obtener el usuario del token JWT sin necesidad de parsear el header manualmente.

```java
@RestController
@RequestMapping("/api/cuentas")
public class CuentaController {

    // GET /api/cuentas — cuentas del usuario autenticado
    @GetMapping
    public ResponseEntity<List<CuentaDto>> getMisCuentas(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
            cuentaService.getCuentasDelUsuario(userDetails.getUsername())
        );
    }

    // GET /api/cuentas/{id}/movimientos — últimos 10 movimientos
    @GetMapping("/{id}/movimientos")
    public ResponseEntity<List<MovimientoDto>> getMovimientos(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
            cuentaService.getMovimientos(id, userDetails.getUsername())
        );
    }

    // POST /api/cuentas/transferir — transferencia entre cuentas
    @PostMapping("/transferir")
    public ResponseEntity<Map<String, String>> transferir(
            @Valid @RequestBody TransferenciaRequest req,
            @AuthenticationPrincipal UserDetails userDetails) {
        cuentaService.transferir(req, userDetails.getUsername());
        return ResponseEntity.ok(Map.of("message", "Transferencia realizada con éxito."));
    }
}
```

---

### 6. Servicio de Cuentas — Transferencia Transaccional (`CuentaService.java`)

La operación más crítica del sistema. Usa `@Transactional` para garantizar que si algo falla a mitad de la transferencia, ambas cuentas vuelven a su estado anterior (atomicidad).

```java
@Transactional
public void transferir(TransferenciaRequest req, String emailOrigen) {
    // 1. Busca la cuenta origen y verifica que pertenece al usuario autenticado
    Cuenta origen = cuentaRepository.findByNumeroCuenta(req.cuentaOrigenNumero())
            .orElseThrow(() -> new IllegalArgumentException("Cuenta origen no encontrada."));

    if (!origen.getUsuario().getEmail().equals(emailOrigen)) {
        throw new SecurityException("No tienes permiso sobre esta cuenta.");
    }

    // 2. Busca la cuenta destino
    Cuenta destino = cuentaRepository.findByNumeroCuenta(req.cuentaDestinoNumero())
            .orElseThrow(() -> new IllegalArgumentException("Cuenta destino no encontrada."));

    // 3. Verifica saldo suficiente
    if (origen.getSaldo().compareTo(req.monto()) < 0) {
        throw new IllegalArgumentException("Saldo insuficiente.");
    }

    // 4. Actualiza saldos
    origen.setSaldo(origen.getSaldo().subtract(req.monto()));
    destino.setSaldo(destino.getSaldo().add(req.monto()));
    cuentaRepository.save(origen);
    cuentaRepository.save(destino);

    // 5. Registra movimientos en ambas cuentas
    Movimiento movOrigen = new Movimiento();
    movOrigen.setTipo(Movimiento.TipoMovimiento.TRANSFERENCIA_ENVIADA);
    movOrigen.setMonto(req.monto());
    movOrigen.setSaldoAnterior(/* saldo antes */);
    movOrigen.setSaldoPosterior(origen.getSaldo());
    movimientoRepository.save(movOrigen);

    // ... igual para la cuenta destino (TRANSFERENCIA_RECIBIDA)
}
```

**Garantías de la transacción:**
- Si falla el `save` de la cuenta destino → se revierte el `save` de la cuenta origen
- Si falla el registro del movimiento → se revierten los cambios de saldo
- Nunca queda dinero "en el aire"

---

---

## FRONTEND — React

---

### 7. Cliente Supabase (`lib/supabase.js`)

Inicializa el cliente de Supabase de forma segura. Si las variables de entorno no están configuradas, no lanza una excepción que rompa toda la app — simplemente exporta `null` y el resto del código lo maneja.

```javascript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL      || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Flag para saber si Supabase está disponible
export const supabaseConfigured = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

// Solo crea el cliente si las dos variables están presentes
// createClient(undefined, undefined) lanzaría una excepción y rompería React
export const supabase = supabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
```

Las variables se definen en `frontend/.env`:
```env
VITE_SUPABASE_URL=https://utdlprovegxdjjgsykxl.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_rNBB2yKCL5MqvaR511Ef2A_QsfqlNAM
```

> Vite solo expone al navegador las variables que empiezan con `VITE_`. Las demás quedan en el servidor de build y no son accesibles desde el código del cliente.

---

### 8. Servicio de Autenticación (`services/authService.js`)

Centraliza toda la lógica de autenticación. El login llama directamente a Supabase Auth — el backend no participa en este paso.

#### 8.1 Login con Supabase

```javascript
export async function login(email, password) {
  // Verifica que Supabase esté configurado antes de intentar
  if (!supabaseConfigured || !supabase) {
    throw Object.assign(new Error('supabase_not_configured'), {
      response: { data: { message: 'Supabase no está configurado.' } },
    });
  }

  // Llama directamente a Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Convierte el error de Supabase al formato que espera el componente LoginPage
    throw Object.assign(new Error(error.message), {
      response: { data: { message: traducirError(error.message) } },
    });
  }

  // Extrae el token JWT y los datos del usuario
  const token   = data.session.access_token;
  const usuario = {
    id:    data.user.id,
    email: data.user.email,
    name:  data.user.user_metadata?.nombre || data.user.email.split('@')[0],
  };

  return { token, user: usuario }; // mismo formato que esperaba el código original
}
```

#### 8.2 Interceptor de Axios

Adjunta automáticamente el JWT de Supabase en cada petición al backend:

```javascript
export const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

Así cualquier llamada como `apiClient.get('/cuentas')` incluye automáticamente el header `Authorization: Bearer eyJ...` sin tener que escribirlo en cada petición.

#### 8.3 Traducción de errores

```javascript
function traducirError(msg) {
  const m = msg.toLowerCase();
  if (m.includes('invalid login') || m.includes('invalid credentials'))
    return 'Correo o contraseña incorrectos.';
  if (m.includes('email not confirmed'))
    return 'Confirma tu correo antes de ingresar.';
  if (m.includes('rate limit'))
    return 'Demasiados intentos. Espera unos minutos.';
  return msg;
}
```

Supabase devuelve errores en inglés. Esta función los convierte al español para mostrarlos al usuario.

---

### 9. Contexto de Autenticación (`context/AuthContext.jsx`)

Provee el estado de sesión a todos los componentes de la app usando el patrón Context de React. Cualquier componente puede saber si hay sesión activa con `useAuth()`.

```javascript
export function AuthProvider({ children }) {
  const [sesion, setSesion]     = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Al montar, carga la sesión guardada en localStorage
    setSesion(obtenerSesion());
    setCargando(false);

    if (!supabase) return;

    // Escucha eventos de Supabase en tiempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          // El usuario cerró sesión (incluso desde otra pestaña)
          cerrarSesion();
          setSesion(null);
        } else if (event === 'TOKEN_REFRESHED' && session) {
          // Supabase renovó el token automáticamente (cada hora)
          const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
          if (usuario) {
            guardarSesion(session.access_token, usuario);
            setSesion({ token: session.access_token, usuario });
          }
        }
      }
    );

    return () => subscription.unsubscribe(); // limpieza al desmontar
  }, []);
```

**Eventos que maneja:**
- `SIGNED_OUT` — limpia la sesión si el usuario cierra sesión desde otra pestaña
- `TOKEN_REFRESHED` — actualiza el token en localStorage cuando Supabase lo renueva (los tokens duran 1 hora por defecto)

---

### 10. Ruta Protegida (`components/ProtectedRoute.jsx`)

Componente que envuelve las rutas privadas. Si no hay sesión, redirige al login. Mientras verifica la sesión, muestra un spinner para evitar un flash de contenido no autorizado.

```javascript
export default function ProtectedRoute({ children }) {
  const { sesion, cargando } = useAuth();

  // Mientras carga la sesión desde localStorage, muestra spinner
  // Evita el "flash" de redirigir al login cuando en realidad sí hay sesión
  if (cargando) {
    return (
      <div className="min-h-screen bg-theme flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-11 h-11 border-4 border-[var(--color-primary)]
                          border-t-transparent rounded-full animate-spin" />
          <p className="text-theme-muted text-sm">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // Sin sesión → redirige al login
  if (!sesion) return <Navigate to="/login" replace />;

  // Con sesión → renderiza el contenido protegido
  return children;
}
```

Se usa en `App.jsx` así:
```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

---

### 11. Hook de Estado del Backend (`hooks/useBackendStatus.js`)

Hook personalizado que monitorea si el backend está disponible. Sondea cada 30 segundos y muestra un toast cuando el estado cambia. El toast se cierra automáticamente a los 5 minutos.

```javascript
const HEALTH_URL    = 'http://localhost:8080/api/public/health';
const ACTUATOR_URL  = 'http://localhost:8080/actuator/health';
const POLL_INTERVAL  = 30_000;          // cada 30 segundos
const TOAST_DURATION = 5 * 60 * 1000;  // toast visible 5 minutos

export function useBackendStatus() {
  const [status, setStatus] = useState('checking'); // 'checking' | 'online' | 'offline'
  const [lastCheck, setLastCheck] = useState(null);
  const [toast, setToast] = useState({ visible: false, dismissed: false });

  const check = useCallback(async () => {
    let isOnline = false;
    try {
      // Intenta el endpoint propio primero
      const res = await fetch(HEALTH_URL, {
        method: 'GET',
        signal: AbortSignal.timeout(5000), // timeout de 5 segundos
      });
      isOnline = res.ok;
    } catch {
      // Si falla, intenta el actuator de Spring Boot
      try {
        const res = await fetch(ACTUATOR_URL, { signal: AbortSignal.timeout(5000) });
        isOnline = res.ok;
      } catch {
        isOnline = false;
      }
    }

    setStatus(isOnline ? 'online' : 'offline');
    setLastCheck(new Date());
  }, []);

  // Muestra toast solo cuando el estado CAMBIA (no en cada sondeo)
  useEffect(() => {
    if (status === 'checking') return;
    if (prevStatusRef.current === status) return; // sin cambio, no hace nada
    prevStatusRef.current = status;

    setToast({ visible: true, dismissed: false });

    // Auto-cierra a los 5 minutos
    toastTimerRef.current = setTimeout(() => {
      setToast(t => ({ ...t, visible: false }));
    }, TOAST_DURATION);
  }, [status]);

  // Sondeo periódico
  useEffect(() => {
    check(); // chequeo inmediato al montar
    const id = setInterval(check, POLL_INTERVAL);
    return () => clearInterval(id); // limpieza al desmontar
  }, [check]);

  return { status, lastCheck, check, toast, dismissToast };
}
```

**Por qué dos endpoints:** si el backend no tiene Actuator configurado, el hook igual funciona usando `/api/public/health`. Tiene fallback automático.

---

## Flujo completo de autenticación

```
Usuario escribe email + password en LoginPage
        │
        ▼
authService.login(email, password)
        │
        ▼
supabase.auth.signInWithPassword()  ──► Supabase Cloud
        │                                    │
        │                          Verifica credenciales
        │                          Genera JWT firmado RS256
        │◄───────────────────────────────────┘
        │  { session.access_token, user }
        ▼
guardarSesion(token, usuario)  →  localStorage
        │
        ▼
AuthContext.iniciarSesion()  →  estado global actualizado
        │
        ▼
navigate('/dashboard')
        │
        ▼
ProtectedRoute verifica sesion  →  OK, renderiza DashboardPage
        │
        ▼
apiClient.get('/cuentas')
  Header: Authorization: Bearer eyJ...  ──► Spring Boot :8080
                                                    │
                                          JwtAuthFilter intercepta
                                          JwtService.isTokenValid()
                                          Descarga JWKS de Supabase
                                          Verifica firma RS256
                                                    │
                                          CuentaController.getMisCuentas()
                                          CuentaService.getCuentasDelUsuario()
                                                    │
                                          ◄─── [ { id, numeroCuenta, saldo } ]
```

---

*Desarrollado por Angel Addair Jeremias Avellaneda — BancoConfianza S.A. — Mayo 2026*
