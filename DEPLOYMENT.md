# 🚀 Guía de Deployment - Rutina Perfecta

Cómo desplegar Rutina Perfecta a producción en diferentes plataformas.

## Opción 1: Vercel (Recomendado para Next.js)

Vercel es creada por el equipo de Next.js y es la forma más fácil de desplegar.

### Prerequisitos
- Cuenta en [Vercel](https://vercel.com)
- Tu código en GitHub

### Pasos

1. **Push a GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/rutinaperfecta.git
git push -u origin main
```

2. **Conectar Vercel a GitHub**
   - Ve a [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Autoriza GitHub
   - Selecciona el repo `rutinaperfecta`

3. **Configurar**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Click "Deploy"

4. **Agregar Variables de Entorno**
   - Settings → Environment Variables
   - Agrega:
     ```
     NEXT_PUBLIC_GA_ID=G-TU-ID
     NEXT_PUBLIC_ADSENSE_ID=ca-pub-TU-ID
     NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
     ```

5. **Redeploy después de agregar variables**

### Dominio Personalizado
1. Settings → Domains
2. Click "Add"
3. Ingresa tu dominio
4. Actualiza DNS según instrucciones

---

## Opción 2: Netlify

### Pasos

1. **Push a GitHub** (igual que Vercel)

2. **Conectar Netlify**
   - Ve a [netlify.com](https://netlify.com)
   - Click "Add new site"
   - "Import an existing project"
   - Autoriza GitHub
   - Selecciona repo

3. **Configurar Build**
   - Build command: `npm run build && npm run export` (si es estática)
   - O: `npm run build`
   - Publish directory: `.next`

4. **Environment Variables**
   - Site settings → Build & Deploy → Environment
   - Agrega variables

5. **Deploy**
   - Haz click "Deploy site"

---

## Opción 3: AWS Amplify

### Pasos

1. **Push a GitHub**

2. **AWS Amplify Console**
   - Ve a AWS Amplify
   - Click "Create app"
   - Selecciona GitHub
   - Autoriza

3. **Configurar**
   - Selecciona repo y rama
   - Accept defaults para Next.js
   - Click "Save and deploy"

---

## Opción 4: DigitalOcean

### Pasos

1. **Crear Droplet**
   - Ve a [digitalocean.com](https://digitalocean.com)
   - Create → Droplets
   - Elige Ubuntu 22.04
   - Selecciona size ($5/mes mínimo)
   - Click "Create Droplet"

2. **SSH en Droplet**
```bash
ssh root@tu-ip-droplet
```

3. **Instalar Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Clonar Repo**
```bash
cd /var/www
git clone https://github.com/tu-usuario/rutinaperfecta.git
cd rutinaperfecta
npm install
npm run build
```

5. **Instalar PM2 (Process Manager)**
```bash
sudo npm install -g pm2
pm2 start "npm start" --name "rutinaperfecta"
pm2 startup
pm2 save
```

6. **Instalar Nginx (Reverse Proxy)**
```bash
sudo apt-get install nginx
```

7. **Configurar Nginx**
```bash
sudo nano /etc/nginx/sites-available/default
```

Reemplaza con:
```nginx
server {
    listen 80 default_server;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

8. **Reinicia Nginx**
```bash
sudo systemctl restart nginx
```

9. **SSL (Let's Encrypt)**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com
```

---

## Opción 5: Render

### Pasos

1. **Push a GitHub**

2. **Render**
   - Ve a [render.com](https://render.com)
   - New → Web Service
   - Connect GitHub repo
   - Selecciona rama: main

3. **Configurar**
   - Name: rutinaperfecta
   - Environment: Node
   - Build command: `npm run build`
   - Start command: `npm start`
   - Click "Create Web Service"

4. **Environment Variables**
   - Environment → Add Environment Variable
   - Agrega tus variables

---

## Pre-Deployment Checklist

- [ ] Build local funciona: `npm run build`
- [ ] No hay console errors
- [ ] Lighthouse score > 80
- [ ] Mobile responsive funciona
- [ ] Todas las páginas cargan
- [ ] Login/Register funciona
- [ ] Wizard funciona
- [ ] enlaces internos funciona
- [ ] Variables de entorno configuradas
- [ ] Dominio listo (si usas personalizado)

---

## Post-Deployment

### 1. Verifica que está en Vivo
```bash
curl https://tu-dominio.com
# Deberías ver HTML
```

### 2. Configura Google Analytics
- Ve a [analytics.google.com](https://analytics.google.com)
- Crea nueva propiedad
- Obtén tu ID (G-XXXXX...)
- Agrega a variables de entorno
- Redeploy

### 3. Configura Google AdSense
- Ve a [adsense.google.com](https://adsense.google.com)
- Crea cuenta
- Obtén tu Publisher ID (ca-pub-XXXXX...)
- Agrega a variables de entorno
- Redeploy
- Espera aprobación (1-3 días)

### 4. Sitemap y RSS
Ya está automático en Next.js:
- `/sitemap.xml` - Auto-generado
- `/robots.txt` - Auto-generado

### 5. Google Search Console
- Ve a [search.google.com/search-console](https://search.google.com/search-console)
- Add property
- Ingresa tu dominio
- Verifica propiedad
- Agrega sitemap: `/sitemap.xml`

### 6. Monitorear Performance
- Vercel Dashboard
- Netlify Analytics
- Google Analytics
- Google PageSpeed Insights

---

## Troubleshooting Deployment

### "Build fails"
```bash
# Limpia caché localmente
rm -rf .next node_modules
npm install
npm run build
```

### "500 Internal Server Error"
- Verifica logs en plataforma
- Verifica variables de entorno
- Verifica que PORT esté configurado

### "CJS requires ESM modules"
- Asegúrate Node.js es 18+
- Limpia node_modules
- Reinstala

### "Memory exceeded"
- Upgrade a tier superior
- Optimiza imágenes
- Reduce bundle size

---

## Optimizaciones de Producción

### 1. Compression
Ya habilitado en Next.js por defecto.

### 2. Caching Headers
En `next.config.js`:
```javascript
headers: async () => {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, s-maxage=86400',
        },
      ],
    },
  ]
}
```

### 3. Image Optimization
Ya habilitado en Next.js por defecto.

### 4. Code Splitting
Ya habilitado en Next.js por defecto.

---

## Monitoreo Continuo

### Errores
- Sentry.io
- LogRocket
- Bugsnag

### Performance
- New Relic
- DataDog
- Grafana

### Uptime
- Pingdom
- UptimeRobot
- Monitored.cc

---

## Escalado Futuro

### Database
- Firebase/Firestore
- MongoDB Atlas
- PostgreSQL en Heroku

### Authentication
- Auth0
- Firebase Auth
- NextAuth.js

### CDN
- Cloudflare (recomendado)
- CloudFront (AWS)
- Bunny CDN

---

## Dominio Personalizado

### Comprar Dominio
- Namecheap
- GoDaddy
- Google Domains

### Configurar DNS
Según plataforma, apunta a:
- CNAME → vercel.com
- A records → IP
- MX records → email

---

## Costos Estimados (Mensual)

| Plataforma | Starter | Pro |
|-----------|---------|-----|
| Vercel | $0 | $20+ |
| Netlify | $0 | $19+ |
| DigitalOcean | $5 | $12+ |
| AWS | Variable | Variable |
| Render | $0 | $7+ |

---

## Siguiente: Monetización

1. Google AdSense aprobado
2. Agregar más rutinas con contenido SEO
3. Analytics para optimizar traffic
4. Mejorar conversiones
5. Premium tier (futuro)

---

¡Listo para producción! 🎉
