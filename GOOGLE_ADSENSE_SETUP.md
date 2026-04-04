# Google AdSense Setup - Rutina Perfecta

## Estado Actual ✅

Tu sitio está completamente configurado para Google AdSense.

### Archivos Configurados

#### 1. **ads.txt** (`/public/ads.txt`)
- ✅ Tu ID de AdSense: `ca-pub-7194910562579872`
- ✅ Formato: DIRECT (Google)
- ✅ Google Ad Manager: RESELLER
- ✅ Headers HTTP: `Content-Type: text/plain; charset=utf-8`
- ✅ Cache: `public, max-age=3600, must-revalidate`
- ✅ Accesible en: `https://tudominio.com/ads.txt`

#### 2. **robots.txt** (`/public/robots.txt`)
- ✅ Permite rastreo de `/ads.txt`
- ✅ Optimizado para Googlebot, Googlebot-Mobile, y Bingbot
- ✅ Sitemap incluido
- ✅ Crawl delay configurado

#### 3. **next.config.js**
- ✅ Headers optimizados para archivos estáticos
- ✅ Cache-Control configurado
- ✅ Content-Type correcto

## Instrucciones para Google AdSense

### Paso 1: Verificar en Google AdSense

1. Ve a [Google AdSense](https://www.google.com/adsense/start/)
2. En la sección **"Configuración de sitios"** → **"AdSense"**
3. Haz clic en **"Verificar estado del archivo ads.txt"**
4. Google comenzará a rastrear tu sitio

### Paso 2: Deploy a Producción

Asegúrate de que cuando deplieges tu sitio:

```bash
# Build
npm run build

# Start (en tu servidor)
npm start

# O deploy a tu hosting (Vercel, Netlify, etc.)
# El archivo public/ads.txt se incluirá automáticamente
```

### Paso 3: Esperar Confirmación

- Google tardará **24-72 horas** en encontrar y verificar el archivo
- Una vez verificado, verás en AdSense: **"Autorizado: su ID de editor aparece en el archivo ads.txt"**

## Verificación Manual

Para verificar que todo está funcionando:

```bash
# Test local
npm start

# En otra terminal o navegador
curl http://localhost:3000/ads.txt

# Deberías ver:
# # Ads.txt file for Rutina Perfecta
# # Google AdSense
# google.com, ca-pub-7194910562579872, DIRECT, f08c47fec0942fa0
# # Google Ad Manager
# google.com, pub-7194910562579872, RESELLER, f08c47fec0942fa0
```

## En Producción

Una vez que tu sitio esté en un dominio público:

1. **Verificar manualmente**: `https://tudominio.com/ads.txt`
   - Debería mostrar el contenido del archivo

2. **En Google Search Console**:
   - Verifica que Google pueda rastrear tu sitio
   - Envía el sitemap

3. **En Google AdSense**:
   - Revisa "Configuración de sitios"
   - Estado mostrará: ✅ Autorizado

## Archivos Completos

### ads.txt
```
# Ads.txt file for Rutina Perfecta
# Google AdSense
google.com, ca-pub-7194910562579872, DIRECT, f08c47fec0942fa0

# Google Ad Manager
google.com, pub-7194910562579872, RESELLER, f08c47fec0942fa0
```

### robots.txt (Parcial - Ver archivo completo)
```
User-agent: *
Allow: /
Allow: /ads.txt

User-agent: Googlebot
Allow: /
Allow: /ads.txt
Crawl-delay: 0

User-agent: Googlebot-Mobile
Allow: /
Allow: /ads.txt
```

## Notas Importantes

- ⚠️ No cambies el ID de editor: `ca-pub-7194910562579872`
- ⚠️ Mantén los archivos en `/public/` folder
- ⚠️ Never delete or move `ads.txt` después de que Google lo verifique
- ✅ Next.js 14 automáticamente sirve archivos desde `/public/` en la raíz
- ✅ Headers HTTP se configuran automáticamente vía `next.config.js`

## Troubleshooting

### Google dice "No se ha encontrado"
1. Verifica que tu sitio esté en producción (dominio público)
2. Espera 24-72 horas desde el último deploy
3. Haz clic en "Verificar estado" nuevamente en AdSense

### Archivo inaccesible
1. Verifica que exista: `public/ads.txt`
2. Reconstruye: `npm run build`
3. Redeploy a producción
4. Test: `curl https://tudominio.com/ads.txt`

### Build no incluye ads.txt
- No debería pasar - Next.js automáticamente lo incluye
- Si ocurre, verifica que Next.js esté correctamente instalado

## Próximos Pasos

1. ✅ Deploy tu sitio a producción
2. ✅ Espera 24-72 horas
3. ✅ Verifica en Google AdSense
4. ✅ Listo para monetizar con anuncios

---
**Última actualización**: 4 de Abril, 2026
**Estado**: ✅ Listo para producción
