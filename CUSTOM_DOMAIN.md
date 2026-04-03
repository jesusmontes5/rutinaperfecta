# 🌐 Configurar Dominio Personalizado

Guía completa para conectar tu dominio personalizado a Vercel.

## ✅ Opción 1: Usar Dominio Gratis (Recomendado para empezar)

Vercel te da automáticamente:
```
https://rutinaperfecta.vercel.app
```

**Ventajas:**
- HTTPS automático ✅
- Deployment automático ✅
- No cuesta nada ✅
- Perfecto para pruebas

**Si eliges esto, solo actualiza en Vercel:**
```
NEXT_PUBLIC_SITE_URL=https://rutinaperfecta.vercel.app
```

---

## ✅ Opción 2: Dominio Personalizado Propio

### 📋 Requisitos:
- Tener un dominio registrado (tudominio.com)
- Acceso a panel de DNS de tu proveedor

### Proveedores populares:
- **Namecheap** (recomendado, barato)
- **GoDaddy**
- **Google Domains**
- **Ionos**

### 🔧 Pasos para conectar:

#### PASO 1: En Vercel Dashboard

1. Ve a tu proyecto
2. **Settings** → **Domains**
3. Click **"Add Domain"**
4. Escribe tu dominio: `tudominio.com`
5. Vercel muestra las opciones DNS

#### PASO 2: Elegir método DNS

Vercel te da 2 opciones:

**OPCIÓN A: Nameservers (Más fácil)**
```
Nameservers a agregar:
- ns1.vercel-dns.com
- ns2.vercel-dns.com
```

**OPCIÓN B: CNAME (Si quieres mantener tu DNS actual)**
```
CNAME: cname.vercel-dns.com
```

#### PASO 3: Ir a tu proveedor DNS

1. Inicia sesión en Namecheap/GoDaddy/etc
2. Busca "Manage DNS" o "DNS Settings"
3. Agrega los nameservers O CNAME según elegiste

#### PASO 4: Esperar propagación

- **Tiempo:** 5 minutos a 48 horas (usualmente 15 min)
- Vercel te notifica cuando esté conectado

#### PASO 5: Actualizar Vercel

Una vez conectado, en **Environment Variables**:

Cambiar:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Por:
```
NEXT_PUBLIC_SITE_URL=https://tudominio.com
```

---

## 🎯 Checklist

```
[ ] Tengo un dominio registrado
[ ] Acceso a panel DNS del proveedor
[ ] Agregué nameservers o CNAME en DNS
[ ] En Vercel aparece "Connected" en Domains
[ ] Actualicé NEXT_PUBLIC_SITE_URL en Vercel
[ ] Esperé a que se propague (~15 min)
[ ] Puedo acceder en https://tudominio.com
```

---

## 🔒 SSL/HTTPS Automático

Vercel proporciona certificado SSL gratis automáticamente:
- ✅ Todos los dominios tienen HTTPS
- ✅ Se renueva automáticamente
- ✅ No tienes que hacer nada

---

## 📊 Dónde se usa NEXT_PUBLIC_SITE_URL

Esta variable está en 4 lugares importantes:

### 1. **Open Graph (Redes Sociales)**
```
Cuando compartes link en Twitter/Facebook/LinkedIn
Usa NEXT_PUBLIC_SITE_URL para preview correcto
```

### 2. **SEO Meta Tags**
```
<link rel="canonical" href="{NEXT_PUBLIC_SITE_URL}/page">
Vercel y Google usan esto para indexar correctamente
```

### 3. **Sitemap XML**
```
<loc>{NEXT_PUBLIC_SITE_URL}/rutinas/rutina-3-dias</loc>
Google lo usa para indexación
```

### 4. **Google Analytics**
```
Debe coincidir con el dominio en GA
Si no coincide, el rastreo falla
```

---

## ⚠️ Errores Comunes

### Error: "Domain already taken"
- Alguien más registró ese dominio en Vercel
- Solución: Usa nameservers en tu DNS en lugar de CNAME

### Error: "NEXT_PUBLIC_SITE_URL no coincide"
- Vercel tiene `https://tudominio.com`
- Pero env var dice `http://localhost:3000`
- Solución: Actualizar la variable en Vercel Dashboard

### Error: Google Analytics no rastrea
- NEXT_PUBLIC_SITE_URL no coincide con GA setup
- Solución: Verificar que los dominios sean exactos

---

## 🚀 Resumen Rápido

| Escenario | URL | Configuración |
|-----------|-----|------------------|
| **Desarrollo Local** | http://localhost:3000 | Ya está en .env.local |
| **Producción (Vercel gratis)** | https://rutinaperfecta.vercel.app | NEXT_PUBLIC_SITE_URL=https://rutinaperfecta.vercel.app |
| **Con dominio propio** | https://tudominio.com | NEXT_PUBLIC_SITE_URL=https://tudominio.com |

---

## 📞 Soporte

- **Vercel Docs:** https://vercel.com/docs/concepts/projects/domains
- **DNS Propagation Check:** https://www.whatsmydns.net/
- **SSL Certificate:** Automático, no requiere acción

---

## ✅ Después de conectar dominio

1. El sitio es accesible en: `https://tudominio.com`
2. Google indexará automáticamente
3. Google Analytics reportará correctamente
4. AdSense funcionará con el nuevo dominio
5. Todo deployment futuro usa el nuevo dominio

**¡Listo para producción!**
