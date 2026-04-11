# 🏋️ Body Exercise Explorer - Documentación Completa

## 📋 Descripción General

El **Body Exercise Explorer** es una funcionalidad moderna y premium para aplicaciones de fitness que permite a los usuarios explorar ejercicios por grupos musculares de forma interactiva. Incluye:

- 🗺️ **Mapa interactivo del cuerpo** - SVG con zonas clicables
- 💪 **Base de datos de ejercicios** - Más de 20 ejercicios predefinidos
- 🎥 **Videos demostrativos** - MP4 en autoplay, loop y muted
- ✨ **Animaciones premium** - GSAP para transiciones fluidas
- 📱 **Diseño responsive** - Mobile-first y totalmente adaptable
- 🎨 **Diseño cohesivo** - Mantiene identidad visual existente

---

## 🏗️ Estructura de Componentes

### 1. **BodyExerciseExplorer** (`components/BodyExerciseExplorer.tsx`)
Componente principal que integra todo el sistema.

**Features:**
- Orquestación de estado
- Filtrado dinámico
- Animaciones de transición
- Layout responsive (mapa + ejercicios)

```tsx
import BodyExerciseExplorer from '@/components/BodyExerciseExplorer';

export default function Page() {
  return <BodyExerciseExplorer />;
}
```

---

### 2. **BodyMap** (`components/BodyMap.tsx`)
Mapa interactivo del cuerpo con SVG.

**Props:**
```ts
interface BodyMapProps {
  selectedPart: BodyPart | null;
  onSelectPart: (part: BodyPart) => void;
}
```

**Grupos musculares:**
- `chest` - Pecho
- `back` - Espalda
- `shoulders` - Hombros
- `arms` - Brazos
- `abs` - Abdomen
- `legs` - Piernas

**Features:**
- Hover effects con GSAP
- Glow effect en selección
- Botones de leyenda interactivos
- Información de zona seleccionada

---

### 3. **ExerciseList** (`components/ExerciseList.tsx`)
Lista de ejercicios filtrada y responsiva.

**Props:**
```ts
interface ExerciseListProps {
  exercises: Exercise[];
  isLoading?: boolean;
  bodyPart?: BodyPart | null;
}
```

**Features:**
- Grid responsive (1, 2, 3 columnas)
- Estado vacío elegante
- Estado cargando con skeleton
- Animación escalonada de entrada

---

### 4. **ExerciseCard** (`components/ExerciseCard.tsx`)
Tarjeta individual de ejercicio.

**Props:**
```ts
interface ExerciseCardProps {
  exercise: Exercise;
  index?: number;
}
```

**Features:**
- Video autoplay/loop/muted
- Información completa del ejercicio
- Badges de dificultad y stats
- Hover con zoom y elevación
- Fallback si video no carga

---

## 📚 Base de Datos de Ejercicios

### Estructura de Datos: `lib/exerciseDatabase.ts`

```ts
interface Exercise {
  id: string;           // ID único
  name: string;         // Nombre del ejercicio
  bodyPart: BodyPart;   // Grupo muscular
  description: string;  // Descripción
  media: string;        // URL del video MP4
  reps?: string;        // Repeticiones (ej: "10-15")
  sets?: number;        // Series (ej: 3)
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
```

### Agregar Nuevos Ejercicios

```ts
// En exerciseDatabase.ts
export const exerciseDatabase: Exercise[] = [
  {
    id: 'nuevo-001',
    name: 'Mi Nuevo Ejercicio',
    bodyPart: 'chest',
    description: 'Descripción del ejercicio',
    media: '/videos/exercises/mi-ejercicio.mp4',
    reps: '12-15',
    sets: 3,
    difficulty: 'intermediate',
  },
  // ... más ejercicios
];
```

---

## 🎨 Diseño y Paleta de Colores

### Colores Utilizados (de `tailwind.config.ts`)

```ts
// Paleta Gold (Principal)
gold-50: '#faf8f3'
gold-100: '#f5f0e8'
gold-primary: '#d4a574'  // Color principal
gold-dark: '#a67c52'     // Para contrastes

// Neutrales
text: '#1a1a1a'
text-muted: '#8a8a8a'
background: '#ffffff'
gold-very-light: '#faf7f3'

// Estados
success: '#22c55e'
warning: '#f59e0b'
error: '#ef4444'
```

### Tipografía

- **Display:** Playfair Display (headings)
- **Body:** Plus Jakarta Sans (contenido)

---

## ⚡ Animaciones y Transiciones

### Usar GSAP

```tsx
import gsap from 'gsap';

// Ejemplo de animación
gsap.to(element, {
  duration: 0.3,
  opacity: 1,
  y: 0,
  ease: 'power2.out',
});
```

### Animaciones Implementadas

1. **Entrada de componentes** - Scale + fade in
2. **Hover del mapa** - Elevación y glow
3. **Selección de zona** - Cambio de color y sombra
4. **Entrada de tarjetas** - Stagger animation
5. **Hover de tarjetas** - Zoom + elevación

---

## 🎯 Optimización de Rendimiento

### Video Loading

```tsx
// Videos se reproducen con:
<video
  autoPlay        // Inicia automáticamente cuando es visible
  loop           // Se repite continuamente
  muted          // Sin sonido (requerido para autoplay)
  playsInline    // Inline en móvil
/>
```

### Lazy Loading Recomendado

```tsx
// Usar hook personalizado
import { useVideoLazyLoad } from '@/hooks/useExerciseFiltering';

const videoRef = useRef<HTMLVideoElement>(null);
useVideoLazyLoad(videoRef);
```

### Caché de Ejercicios

```tsx
// El hook useExerciseFiltering implementa caché con useMemo
const filteredExercises = useMemo(() => {
  // Filtrado optimizado
}, [dependencies]);
```

---

## 📱 Responsive Design

### Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Layout por Device

```
MOBILE:
- Mapa full-width
- Ejercicios en grid 1 columna

TABLET:
- Mapa arriba
- Ejercicios en grid 2 columnas

DESKTOP:
- Mapa sticky en sidebar (izq)
- Ejercicios en grid 3 columnas (der)
```

---

## 🔧 Configuración Avanzada

### Personalizar Grupos Musculares

```ts
// En lib/exerciseDatabase.ts
export const bodyPartMetadata: Record<BodyPart, ...> = {
  chest: {
    label: 'Pecho',
    icon: '🏋️',
    description: 'Músculos pectorales',
  },
  // Agregar más según necesites
};
```

### Cambiar Colores

```ts
// En tailwind.config.ts
colors: {
  gold: {
    primary: '#tu-color-aqui',
    dark: '#otro-color',
    // ...
  }
}
```

### Modificar Videos

```ts
// Reemplaza URLs en exerciseDatabase.ts
media: '/videos/exercises/nuevo-video.mp4'
```

---

## 🚀 Integración en Proyecto

### 1. Copiar archivos

```
components/
├── BodyExerciseExplorer.tsx
├── BodyMap.tsx
├── ExerciseCard.tsx
├── ExerciseList.tsx

lib/
├── exerciseDatabase.ts

hooks/
├── useExerciseFiltering.ts

app/
└── body-explorer/
    └── page.tsx
```

### 2. Instalar dependencias (si no están)

```bash
npm install gsap
```

### 3. Usar en rutas

```tsx
// app/rutina/body-explorer/page.tsx
import BodyExerciseExplorer from '@/components/BodyExerciseExplorer';

export default function Page() {
  return <BodyExerciseExplorer />;
}
```

---

## 🎓 Ejemplos de Uso Avanzado

### Filtrado Personalizado

```tsx
import { useExerciseFiltering } from '@/hooks/useExerciseFiltering';

function CustomFilter() {
  const {
    filteredExercises,
    searchTerm,
    setSearchTerm,
    selectedDifficulty,
    setSelectedDifficulty,
  } = useExerciseFiltering({
    bodyPart: 'chest',
    difficulty: 'beginner',
  });

  return (
    <>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar ejercicio..."
      />
      {filteredExercises.map((ex) => (
        <ExerciseCard key={ex.id} exercise={ex} />
      ))}
    </>
  );
}
```

---

## 📊 Estadísticas del Código

- **Componentes:** 4 principales
- **Ejercicios predefinidos:** 24
- **Grupos musculares:** 6
- **Tamaño bundleSize:** ~45KB (minified)
- **Dependencias:** GSAP, React (hooks)

---

## 🐛 Resolución de Problemas

### Videos no se reproducen
- Verificar rutas de videos `/public/videos/exercises/`
- Asegurar que los videos son MP4 H.264
- Revisar permisos CORS si son externos

### Animaciones lentas
- Reducir número de ejercicios mostrados
- Verificar performance en DevTools
- Usar Lighthouse para profiling

### Problemas responsivos
- Verificar viewport meta tag
- Testear en múltiples devices
- Revisar media queries en Tailwind

---

## 📝 TODOs Futuros

- [ ] Agregar filtro por dificultad en UI
- [ ] Integrar búsqueda por nombre
- [ ] Guardar ejercicios favoritos
- [ ] Historial de ejercicios realizados
- [ ] Compartir rutinas personalizadas
- [ ] Análisis de progreso
- [ ] Integración con wearables

---

## 📄 Licencia

Parte de la suite de fitness Rutina Perfecta.

---

## ✨ Próximos Pasos

1. **Agregar más ejercicios** a la base de datos
2. **Crear videos demostrativos** para cada ejercicio
3. **Implementar usuario favoritos** con localStorage
4. **Integrar con sistema de rutinas** existente
5. **Analytics** para ver ejercicios más populares

---

**Preguntas o sugerencias?** Contacta al equipo de desarrollo.
