# 🧪 Guía de Testing - Rutina Perfecta

Cómo probar todas las funcionalidades de Rutina Perfecta.

## 1. Testing del Wizard

### Caso 1: Generar Rutina de 3 Días - Masa - Principiante - Gimnasio

1. Ve a http://localhost:3000
2. En el Wizard:
   - Objetivo: "Ganar Masa" 💪
   - Nivel: "Principiante" 🌱
   - Días: "3"
   - Ubicación: "Gimnasio" 🏋️
3. Click en "Generar Rutina"
4. **Esperado**: Verás una rutina de 3 días con ejercicios básicos

### Caso 2: Generar Rutina en Casa - 5 Días - Avanzado

1. Repite el wizard con:
   - Objetivo: "Mantener" ⚖️
   - Nivel: "Avanzado" 🚀
   - Días: "5"
   - Ubicación: "Casa" 🏠
2. **Esperado**: Rutina con ejercicios de peso corporal

### Caso 3: Validación - No Generar sin completar

1. Intenta clickear "Siguiente" sin seleccionar nada
2. **Esperado**: Botón deshabilitado (gris)
3. Selecciona una opción
4. **Esperado**: Botón se activa (azul)

## 2. Testing de Autenticación

### Registro Exitoso

1. Click en "Registrarse" navbar
2. Completa:
   - Nombre: "Juan Pérez"
   - Email: "juan@example.com"
   - Contraseña: "MiPassword123"
   - Confirmar: "MiPassword123"
3. Click "Registrarse"
4. **Esperado**: Redirección a home, ves "Hola, Juan Pérez!" navbar

### Validación de Registro

#### Contraseñas no coinciden
1. Ingresa contraseña: "Password123"
2. Confirma: "Different123"
3. **Esperado**: Error "Las contraseñas no coinciden"

#### Contraseña muy corta
1. Contraseña: "12345" (5 caracteres)
2. **Esperado**: Error "mínimo 6 caracteres"

### Email Duplicado
1. Registra: test@email.com
2. Intenta registrar de nuevo con el mismo email
3. **Esperado**: Error "El email ya está registrado"

### Login Exitoso
1. Click "Ingresar"
2. Email: juan@example.com
3. Contraseña: MiPassword123
4. Click "Ingresar"
5. **Esperado**: Redirección a home, sesión activa

### Login Fallido
1. Email correcto
2. Contraseña incorrecta
3. **Esperado**: Error "Email o contraseña incorrectos"

### Logout
1. Estando logueado, click "Salir" navbar
2. **Esperado**: Sesión cierra, navbar muestra "Ingresar" again

## 3. Testing de Rutinas

### Ver Rutinas Predefinidas
1. Ve a /rutinas
2. **Esperado**: Ves 4 rutinas:
   - Rutina 3 Días Full Body
   - Rutina 4 Días Torso/Pierna
   - Principiantes Casa
   - Rutina 5 Días PPL

### Expandir/Contraer Rutina
1. En cualquier tarjeta de rutina, click "Ver Detalles"
2. **Esperado**: Se expande mostrando ejercicios
3. Click "Ocultar Detalles"
4. **Esperado**: Se contrae

### Ver Rutina Individual
1. Click "Ver Rutina Completa" en cualquier tarjeta
2. **Esperado**: Página específica con:
   - Breadcrumb
   - Tarjeta expandida
   - Contenido largo de SEO
   - Sidebar con info
   - Otras rutinas al final

### Navegación entre Rutinas
1. En página individual de rutina
2. En sidebar, click en "Rutinas similares"
3. **Esperado**: Navega a otra rutina

## 4. Testing Responsive

### Desktop
1. Abre DevTools (F12)
2. Desactiva Device Toolbar
3. Navega por el sitio
4. **Esperado**: Layouts en columnas, todo visible

### Tablet
1. DevTools → Device Toolbar
2. Elige iPad
3. **Esperado**: Layouts adaptados, menu funciona

### Mobile
1. Device Toolbar → iPhone 12
2. **Esperado**:
   - Menu hamburguesa en navbar
   - Contenido adaptado
   - Botones grandes clickeables
   - Sin scroll horizontal

## 5. Testing de Navegación

### Navbar
- [x] Click home → va a /
- [x] Click rutinas → va a /rutinas
- [x] Click login → va a /login
- [x] Links legales funcionan

### Footer
- [x] Links internos funcionan
- [x] Links externos no rompen
- [x] Copyright actualizado

### Breadcrumbs
- [x] En /rutinas/[slug] mostrar breadcrumb
- [x] Breadcrumb es clickeable

## 6. Testing de Animaciones

### En Home
1. Observa el hero section
2. **Esperado**: Texto aparece con fadeIn
3. Desplázate
4. **Esperado**: Zoom suave en tarjetas

### En Wizard
1. Cada pantalla aparece con slideInRight
2. Barra de progreso se llena suavemente
3. Al generar rutina: loading spinner gira
4. Rutina aparece con fadeIn

### En Tarjetas
1. Hover sobre tarjeta
2. **Esperado**: Hover scale y shadow

## 7. Testing de localStorage

### Test 1: Persistencia de Login
1. Registrate
2. Cierra navegador
3. Abre http://localhost:3000
4. **Esperado**: Sigues logueado, vés tu nombre

### Test 2: Limpieza de localStorage
1. Abre DevTools → Application → Local Storage
2. Borra "rutinaperfecta_current_user"
3. Recarga página
4. **Esperado**: Sesión se cierra

## 8. Testing de SEO

### Meta Tags
1. Abre DevTools
2. → Sources → Top
3. Busca `<meta name="description"
4. **Esperado**: Cada página tiene description

### Open Graph
1. DevTools → Right-click → View page source
2. Busca `og:title`, `og:description`
3. **Esperado**: Tags presentes en home y rutinas

### Headings
1. DevTools
2. → Elements → Busca `<h1>`
3. **Esperado**: Solo 1 h1 por página
4. h2, h3 en orden jerárquico

## 9. Testing de Formularios

### Login Form
- [x] Email requerido
- [x] Contraseña requerida
- [x] Validación de email (si es válido)

### Register Form
- [x] Nombre requerido
- [x] Email requerido
- [x] Contraseña requerida
- [x] Confirmar requerida
- [x] Validación de email

## 10. Testing de Páginas Legales

### Privacidad (/legal/privacidad)
1. Footer → Click Privacidad
2. **Esperado**: Carga página con contenido
3. Breadcrumb funciona

### Cookies (/legal/cookies)
1. Footer → Click Cookies
2. **Esperado**: Same as above

### Aviso Legal (/legal/aviso-legal)
1. Footer → Click Aviso Legal
2. **Esperado**: Same as above

## 11. Testing de Performance

### PageSpeed
1. Abre https://pagespeed.web.dev
2. Analiza http://localhost:3000
3. **Esperado**: Score > 80 en mobile

### Lighthouse
1. DevTools → Lighthouse
2. Genera reporte
3. **Esperado**:
   - Performance: 70+
   - Accessibility: 90+
   - Best Practices: 85+
   - SEO: 95+

## 12. Testing de Accesibilidad

### Navegación por Teclado
1. Press Tab
2. Navega solo con Tab
3. **Esperado**: Todos los elementos focusables

### Focus Visible
1. Press Tab
2. **Esperado**: Ves el outline azul en elementos

### Alt Text
1. DevTools → Elements
2. Busca imágenes
3. **Esperado**: Todas tienen alt text

## Checklist de Testing

- [ ] Wizard genera rutinas correctamente
- [ ] Autenticación funciona (register/login/logout)
- [ ] Rutinas predefinidas cargan
- [ ] Páginas individuales de rutinas funcionan
- [ ] Responsive en mobile/tablet/desktop
- [ ] Navegación completa funciona
- [ ] localStorage persiste datos
- [ ] Animaciones suaves
- [ ] Meta tags presentes
- [ ] Formularios validan
- [ ] Páginas legales cargan
- [ ] Sin errores en console
- [ ] Performance es aceptable

## Bugs Conocidos

Ninguno actualmente 🎉

## Cómo Reportar Bugs

Si encuentras un bug:

1. Describe exactamente qué sucede
2. Describe qué debería suceder
3. Pasos para reproducirlo
4. Tu navegador y versión
5. Screenshot si es posible

---

¡Gracias por testing! 🙏
