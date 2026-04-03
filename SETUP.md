# 🚀 Guía de Setup - Rutina Perfecta

Guía paso a paso para configurar y ejecutar Rutina Perfecta localmente.

## Requisitos Previos

Asegúrate de tener instalado:
- **Node.js 18+** - [Descargar](https://nodejs.org/)
- **npm 9+** - Viene con Node.js
- **Git** (opcional) - [Descargar](https://git-scm.com/)

Verifica tu versión:
```bash
node --version
npm --version
```

## Paso 1: Acceder al Directorio

```bash
cd "C:\Users\jmontes\Documents\Jesus\apprutinas"
```

## Paso 2: Instalar Dependencias

```bash
npm install
```

Este paso puede tomar 2-3 minutos. Descargará e instalará todas las librerías necesarias.

**Qué se instala:**
- Next.js 15
- React 19
- TailwindCSS 3
- TypeScript 5

## Paso 3: Ejecutar el Servidor de Desarrollo

```bash
npm run dev
```

Deberías ver algo como:
```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

## Paso 4: Abrir en el Navegador

Abre tu navegador favorito y ve a:
```
http://localhost:3000
```

¡Y listo! Tu aplicación estará funcionando.

---

## 📖 Primeros Pasos

### 1. Explorar la Home
- Verás el hero section con el wizard
- Prueba el generador de rutinas
- Desplázate para ver las rutinas predefinidas

### 2. Crear una Cuenta
- Click en "Registrarse" en la navbar
- Completa el formulario
- Los datos se guardan en localStorage

### 3. Generar una Rutina
- Llena los 4 pasos del wizard
- Verás una pantalla de carga
- Tu rutina personalizada se mostrará en 2 segundos

### 4. Explorar Rutinas
- Ve a la sección "Rutinas"
- Haz click en "Ver Rutina Completa"
- Lee el contenido optimizado para SEO

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev          # Inicia servidor local en puerto 3000

# Build para producción
npm run build        # Compila la app
npm start            # Ejecuta la versión compilada

# Limpieza
npm run build && rm -rf .next    # Limpia cache (Windows: rmdir .next /s)

# Linting
npm run lint         # Ejecuta ESLint
```

## 📁 Estructura de Carpetas Explicada

```
apprutinas/
├── app/                    # Rutas y páginas (App Router)
│   ├── layout.tsx         # Layout principal de toda la app
│   ├── page.tsx           # Página de inicio (/)
│   ├── globals.css        # Estilos globales
│   ├── login/             # Ruta /login
│   ├── register/          # Ruta /register
│   ├── rutinas/           # Ruta /rutinas
│   └── legal/             # Rutas /legal/*
│
├── components/            # Componentes reutilizables
│   ├── Navbar.tsx        # Barra superior
│   ├── Footer.tsx        # Pie de página
│   ├── WizardForm.tsx    # Formulario interactivo
│   └── RoutineCard.tsx   # Tarjeta de rutina
│
├── lib/                   # Funciones y datos
│   ├── auth.ts           # Autenticación con localStorage
│   ├── routine-generator.ts    # Lógica de generación
│   └── routines-data.ts  # Datos de las 4 rutinas
│
├── types/                # Tipos TypeScript
│   └── index.ts         # Definiciones de interfaces
│
├── public/              # Archivos estáticos (favicon, etc)
│
├── package.json         # Dependencias del proyecto
├── next.config.js       # Configuración de Next.js
├── tailwind.config.ts   # Configuración de TailwindCSS
└── tsconfig.json        # Configuración de TypeScript
```

---

## ⚙️ Configuración Inicial

### 1. Variables de Entorno (Opcional)

Para Google Analytics y AdSense:

```bash
# Crear archivo .env.local
cp .env.example .env.local
```

Luego edita `.env.local` y agrega:
```
NEXT_PUBLIC_GA_ID=G-TU-ID
NEXT_PUBLIC_ADSENSE_ID=ca-pub-TU-ID
```

### 2. Configurar Dominio

Cuando deploys a producción, actualiza URLs en:
- `lib/sitemap.ts` - Cambiar dominio
- `app/layout.tsx` - Cambiar GA ID y AdSense ID

---

## 🔧 Troubleshooting

### Error: "Port 3000 already in use"
```bash
# Usa otro puerto
npm run dev -- -p 3001
```

### Error: "Module not found"
```bash
# Reinstala las dependencias
rm -rf node_modules package-lock.json
npm install
```

### Las páginas no cargan contenido
- Limpia la caché del navegador (Ctrl+Shift+Delete)
- Abre la consola (F12) y busca errores
- Reinicia el servidor: Ctrl+C en la terminal y `npm run dev`

### localStorage no funciona
- Verifica que no estés en modo incógnito
- Verifica permisos del navegador
- Limpia datos del sitio en DevTools

---

## 📝 Editar el Proyecto

### Cambiar Colores

Edita `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    600: '#0284c7',  // Cambia este azul
  }
}
```

### Agregar Nuevas Rutinas

Edita `lib/routines-data.ts`:
```typescript
export const prebuiltRoutines = [
  {
    id: '5',
    title: 'Tu nueva rutina',
    slug: 'nueva-rutina',
    // ... más propiedades
  }
]
```

### Cambiar Contenido SEO

Edita las páginas en `/app/rutinas/page.tsx`

---

## 🔍 Verificar Errores

Abre la consola del navegador (F12):
- Tab "Console" - Errores de JavaScript
- Tab "Network" - Solicitudes HTTP
- Tab "Storage" - Datos de localStorage

---

## 🚀 Preparar para Producción

### 1. Build Final
```bash
npm run build
```

### 2. Verificar que no hay errores
```bash
npm start
```

### 3. Desplegar en
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **AWS Amplify**
- **DigitalOcean**
- **Heroku**

### Para Vercel:
```bash
# Instala Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## 📚 Próximos Pasos

1. **Agrega un backend** - Para autenticación real
2. **Conecta una BD** - Para guardar rutinas de usuarios
3. **Desploy** - Sube a producción
4. **SEO** - Verifica Google Search Console
5. **AdSense** - Espera aprobación de Google

---

## 📞 Ayuda Adicional

- **Documentación Next.js**: https://nextjs.org/docs
- **Documentación React**: https://react.dev
- **Documentación TailwindCSS**: https://tailwindcss.com/docs
- **GitHub Issues**: Si encuentra bugs

---

## ✅ Checklist de Setup

- [ ] Node.js 18+ instalado
- [ ] Directorio correcto (`cd apprutinas`)
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor corriendo (`npm run dev`)
- [ ] Browser abierto en http://localhost:3000
- [ ] App mostrando correctamente
- [ ] Wizard funcionando
- [ ] Login/Register funcionando
- [ ] Rutinas calient cargando

¡Estás listo para comenzar a desarrollar! 🎉
