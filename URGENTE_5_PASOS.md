# ⚡ 5 PASOS URGENTES PARA GOOGLE ADSENSE

**HECHO ESTO ANTES DE HACER DEPLOY**

---

## 1️⃣  REEMPLAZAR GOOGLE ANALYTICS ID

**Archivo:** `app/layout.tsx`

**Línea:** ~85

**Buscar:**
```typescript
src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
```

**Reemplazar con tu ID** (consígue en: https://analytics.google.com/)

Ejemplo:
```typescript
src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF45"
```

---

## 2️⃣ REEMPLAZAR GOOGLE ADSENSE ID

**Archivo:** `app/layout.tsx`

**Línea:** ~95

**Buscar:**
```typescript
src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
```

**Reemplazar con tu ID** (consígue en: https://www.google.com/adsense/)

Ejemplo:
```typescript
src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
```

---

## 3️⃣ ACTUALIZAR DOMINIO EN SITEMAP

**Archivo:** `app/sitemap.ts`

**Línea:** 5

**Buscar:**
```typescript
const baseUrl = 'https://www.rutinaperfecta.com'
```

**Reemplazar con tu dominio:**
```typescript
const baseUrl = 'https://www.tudominio.com'
```

---

## 4️⃣ ACTUALIZAR DOMINIO EN ROBOTS.TXT

**Archivo:** `public/robots.txt`

**Línea:** 8

**Buscar:**
```
Sitemap: https://www.rutinaperfecta.com/sitemap.xml
```

**Reemplazar.**
```
Sitemap: https://www.tudominio.com/sitemap.xml
```

---

## 5️⃣ CREAR IMAGEN OG (Open Graph)

**Ubicación:** `public/og-image.jpg`

Especificaciones:
- **Tamaño:** 1200x630 px
- **Formato:** JPG o PNG
- **Nombre:** og-image.jpg

Esta imagen aparecerá cuando compartas tu sitio en redes sociales.

✅ **Puede ser:**
- Screenshot de tu homepage
- Logo + título
- Imagen profesional de fitness

❌ **NO usar:**
- Imágenes con copyright
- Logos de competencia
- Imágenes de baja calidad

---

## 📋 Después de estos 5 pasos:

1. ✅ Build local: `npm run build`
2. ✅ Test en móvil: verifica que funcione
3. ✅ Deploy a producción
4. ✅ Espera 3 días para indexación
5. ✅ Verifica en Google Search Console
6. ✅ Aplica a AdSense

---

## ⚠️ IMPORTANTE

**NO hagas deploy sin completar los 5 pasos**

Si haces deploy sin esto:
- Google Analytics no rastreará nada (data perdida)
- Google AdSense no se conectará (no recibirás ingresos)
- Dominio incorrecto en sitemap (indexación lenta)

---

**Tiempo estimado:** 5-10 minutos

**Dificultad:** ⭐ Muy Fácil

**Resultado:** 🚀 Listo para Google AdSense

---

Revisa `ADSENSE_SETUP.md` para detalles paso a paso completos.
