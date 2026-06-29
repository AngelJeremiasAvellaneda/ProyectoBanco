# 🚀 Quick Deploy Guide - BancoConfianza Frontend a Vercel

**Estado**: ✅ LISTO PARA VERCEL  
**Documentos relacionados**: `frontend/DEPLOYMENT_GUIDE.md`, `frontend/PRODUCTION_CHECKLIST.md`

---

## ⚡ Resumen Rápido

El frontend está 100% listo para Vercel. Solo necesitas:

1. Pushear a GitHub
2. Conectar en Vercel Dashboard
3. Agregar variable de entorno `VITE_API_URL`
4. Deploy automático ✅

---

## 📦 ¿Qué está preparado?

✅ **Build**
- npm audit fixed (0 vulnerabilidades)
- vite.config.js optimizado
- dist/ compila sin errores
- Tamaño: ~900KB (gzip: ~235KB)

✅ **Configuración**
- `vercel.json` con rewrites, cache, headers
- `.vercelignore` para clean deploy
- `.env.example` con instrucciones
- `vite.config.js` con code splitting

✅ **Código**
- Sin localhost hardcodeado
- Variables de entorno centralizadas (`VITE_API_URL`)
- Console logs removidos
- Source maps deshabilitados

✅ **Seguridad**
- API URLs usan vars de entorno
- BackendStatusWidget oculto de públicos
- CORS whitelist listo
- Credenciales en `.gitignore`

---

## 🔧 Pasos Manuales

### **1. Push a GitHub**

```bash
git add .
git commit -m "chore: prepare frontend for vercel deployment"
git push origin main
```

### **2. Crear Proyecto en Vercel**

1. Ir a https://vercel.com/dashboard
2. Click "Add New Project"
3. Seleccionar repo de GitHub: `banco`
4. **Root Directory**: `frontend/` (IMPORTANTE!)
5. Click "Deploy"

### **3. Configurar Environment Variables**

En Vercel Dashboard → Settings → Environment Variables:

```
Name: VITE_API_URL
Value: https://tu-backend.com/api
Environments: Production, Preview
```

Reemplazar `tu-backend.com` con tu dominio real.

### **4. Redeploy (si ya deployó sin la var)**

Vercel Dashboard → Deployments → Latest → Redeploy

---

## 📊 Resultado Esperado

Después del deploy:
- ✅ https://tu-proyecto.vercel.app accesible
- ✅ Landing page carga desde CDN global
- ✅ API calls van a tu backend
- ✅ Build time < 2 minutos
- ✅ Performance score > 80

---

## 🐛 Troubleshooting

### **"Module not found" error**
→ Verificar `Root Directory` en Vercel es `frontend/`

### **"API 404 errors"**
→ Verificar `VITE_API_URL` en Vercel Environment Variables

### **"CORS error"**
→ Agregar tu dominio Vercel en backend CORS allowlist

### **"Build fails"**
→ Vercel Logs → Ver error exacto → Fijar locally → Push

---

## 📚 Documentación Completa

- **Deployment**: `frontend/DEPLOYMENT_GUIDE.md`
- **Checklist**: `frontend/PRODUCTION_CHECKLIST.md`
- **Frontend README**: `frontend/README.md`
- **Proyecto**: `README.md`
- **Credenciales**: `CREDENCIALES_PRUEBA.md`

---

## ✅ Pre-Deploy Checklist Final

```bash
# 1. Build sin errores
cd frontend
npm run build
# ✓ Debe completar exitosamente

# 2. Sin vulnerabilidades
npm audit
# ✓ Debe retornar "0 vulnerabilities"

# 3. Git status limpio
git status
# ✓ No debe haber cambios uncommitted

# 4. Verifica .env está en .gitignore
grep ".env" .gitignore
# ✓ Debe incluir .env y .env.production
```

---

## 🎯 Próximos Pasos

1. ✅ Ejecuta checklist arriba
2. 📤 Push a GitHub
3. 🔗 Conecta en Vercel Dashboard
4. 🔐 Agrega `VITE_API_URL` en Environment Variables
5. ✨ Vercel auto-deploya
6. 🧪 Test en https://tu-proyecto.vercel.app

---

**¡Listo! 🎉 El frontend está completamente preparado para Vercel.**

Cualquier duda, ver documentación en `frontend/` o revisar `PRODUCTION_CHECKLIST.md`.

