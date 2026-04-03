# Rutina Perfecta - Generador de Rutinas de Fitness Personalizado

Una aplicación web moderna, responsiva y optimizada para SEO, construida con Next.js 15, React 19 y TailwindCSS. Genera rutinas de fitness personalizadas en minutos con un asistente interactivo tipo wizard.

## 🎯 Características

- ✅ **Generador de rutinas interactivo** - Wizard de 4 pasos con animaciones suaves
- ✅ **Rutinas personalizadas** - Basadas en objetivo, nivel, frecuencia y ubicación
- ✅ **Rutinas predefinidas** - 4 rutinas profesionales pre-diseñadas con contenido SEO
- ✅ **Autenticación simulada** - Login y registro con localStorage
- ✅ **Optimizado para SEO** - Meta tags, estructura semántica, páginas dinámicas
- ✅ **Google AdSense ready** - Espacios publicitarios estratégicos
- ✅ **Responsive design** - Mobile-first, funciona en todos los dispositivos
- ✅ **Animaciones** - Transiciones suaves y fade-in effects
- ✅ **Dark/Light compatible** - Diseño limpio y moderno
- ✅ **Páginas legales** - Privacidad, cookies, aviso legal

## 🚀 Tecnologías

- **Next.js 15** - Framework React con App Router
- **React 19** - Interfaz de usuario
- **TailwindCSS** - Estilos utility-first
- **TypeScript** - Type safety
- **localStorage** - Persistencia de datos en cliente

## 📁 Estructura del Proyecto

```
apprutinas/
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── globals.css             # Estilos globales
│   ├── page.tsx                # Home con wizard
│   ├── login/page.tsx          # Página de login
│   ├── register/page.tsx       # Página de registro
│   ├── rutinas/
│   │   ├── page.tsx            # Listado de rutinas
│   │   └── [slug]/page.tsx     # Rutina individual dinámicas
│   └── legal/
│       ├── privacidad/page.tsx
│       ├── cookies/page.tsx
│       └── aviso-legal/page.tsx
├── components/
│   ├── Navbar.tsx              # Barra de navegación
│   ├── Footer.tsx              # Pie de página
│   ├── WizardForm.tsx          # Wizard del generador
│   └── RoutineCard.tsx         # Tarjeta de rutina
├── lib/
│   ├── auth.ts                 # Servicios de autenticación
│   ├── routine-generator.ts    # Generador de rutinas
│   └── routines-data.ts        # Datos de rutinas predefinidas
├── types/
│   └── index.ts                # Tipos TypeScript
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── .gitignore
```

## 🛠️ Instalación

### Requisitos
- Node.js 18+ 
- npm 9+ o yarn

### Pasos

1. **Navega al directorio del proyecto**
```bash
cd apprutinas
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

4. **Abre tu navegador**
```
http://localhost:3000
```

## 🏗️ Build para Producción

```bash
# Build
npm run build

# Start
npm start

# O con preview
npm run dev
```

## 📝 Uso

### Home
- Hero section centrado con CTA
- Wizard interactivo de 4 pasos
- Rutinas predefinidas con contenido SEO
- FAQ y CTA final

### Generador de Rutinas

1. **Paso 1**: Selecciona tu objetivo (Masa, Grasa, Mantener)
2. **Paso 2**: Selecciona tu nivel (Principiante, Intermedio, Avanzado)
3. **Paso 3**: Elige frecuencia (2, 3, 4, 5 días)
4. **Paso 4**: Selecciona ubicación (Gimnasio, Casa)

Después se genera automáticamente tu rutina personalizada.

### Autenticación

**Para testing:**
- Registrate con cualquier email y contraseña
- O usa: test@example.com / 123456

Los datos se guardan en localStorage del navegador.

## 🎨 Personalización

### Colores
Edita `tailwind.config.ts` para cambiar los colores principales:
```typescript
primary: {
  600: '#0284c7', // Azul principal
}
```

### Rutinas
Agrega más rutinas en `lib/routines-data.ts`:
```typescript
export const prebuiltRoutines: PrebuiltRoutine[] = [
  // Tus rutinas aquí
];
```

### Ejercicios
Modifica la lógica de generación en `lib/routine-generator.ts`

## 📱 Responsive

- **Mobile**: Optimizado para pantallas pequeñas
- **Tablet**: Layout adaptado
- **Desktop**: Experiencia completa

## 🔍 SEO

- ✅ Meta tags dinámicos
- ✅ Open Graph
- ✅ Estructura semántica HTML
- ✅ Sitemap ready
- ✅ Páginas dinámicas
- ✅ Contenido largo y relevante
- ✅ Heading hierarchy correcto

###Próximos pasos para SEO

1. Configurar Google Analytics
2. Agregar Sitemap (`sitemap.xml`)
3. Agregar robots.txt
4. Configurar Google ADSense

## 💰 Monetización

### Google AdSense

1. Crea una cuenta en [Google AdSense](https://www.google.com/adsense/)
2. Una vez aprobado, obtén tu código de publicador
3. Reemplaza el placeholder en `app/layout.tsx`:

```typescript
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR-ID" />
```

4. Agrega anuncios en lugares estratégicos usando:
```typescript
<div className="ad-space">
  {/* Tu código de anuncio AdSense */}
</div>
```

### Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com)
2. Crea una propiedad
3. Obtén tu ID de medición (G-XXXXXXXXXX)
4. Reemplaza en `app/layout.tsx`

## 🔐 Seguridad

⚠️ **Nota importante**: Esta es una aplicación de demostración. Para producción:

- [ ] Implementar backend real con autenticación segura
- [ ] Hash de contraseñas con bcrypt
- [ ] HTTPS obligatorio
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Validación y sanitización de inputs
- [ ] Variables de entorno sensibles

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

## 🐛 Troubleshooting

### El localhost no funciona
```bash
# Si el puerto 3000 está en uso, usa otro:
npm run dev -- -p 3001
```

### Cookies/localStorage no funcionan
- Verifica que no estés en modo privado/incógnito
- Limpia la caché del navegador
- Verifica la consola para los errores

### Animaciones lentas
- Verifica el rendimiento del navegador
- Reduce las tablas de potencia en tu dispositivo

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

**Rutina Perfecta** - info@rutinaperfecta.com

---

⭐ Si te fue útil, ¡dale una estrella en GitHub!
