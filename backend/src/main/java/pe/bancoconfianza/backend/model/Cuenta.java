package pe.bancoconfianza.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "cuentas")
public class Cuenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_cuenta", nullable = false, unique = true, length = 20)
    private String numeroCuenta;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoCuenta tipo = TipoCuenta.AHORROS;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal saldo = BigDecimal.ZERO;

    @Column(nullable = false)
    private String moneda = "PEN";

    @Column(nullable = false)
    private boolean activa = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum TipoCuenta { AHORROS, CORRIENTE }

    /* ── Getters / Setters ── */
    public Long getId()                        { return id; }
    public void setId(Long id)                 { this.id = id; }

    public String getNumeroCuenta()            { return numeroCuenta; }
    public void setNumeroCuenta(String n)      { this.numeroCuenta = n; }

    public TipoCuenta getTipo()                { return tipo; }
    public void setTipo(TipoCuenta tipo)       { this.tipo = tipo; }

    public BigDecimal getSaldo()               { return saldo; }
    public void setSaldo(BigDecimal saldo)     { this.saldo = saldo; }

    public String getMoneda()                  { return moneda; }
    public void setMoneda(String moneda)       { this.moneda = moneda; }

    public boolean isActiva()                  { return activa; }
    public void setActiva(boolean activa)      { this.activa = activa; }

    public Usuario getUsuario()                { return usuario; }
    public void setUsuario(Usuario usuario)    { this.usuario = usuario; }

    public LocalDateTime getCreatedAt()        { return createdAt; }
}
