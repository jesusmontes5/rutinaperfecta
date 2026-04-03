# GSAP Scroll Reveal Animations - Guía de Uso

Este proyecto utiliza **GSAP (GreenSock Animation Platform)** con **ScrollTrigger** para crear animaciones profesionales cuando el usuario scrollea hacia abajo.

## Instalación

```bash
npm install gsap
```

## Opciones principales

| Opción | Tipo | Default | Descripción |
|--------|------|---------|------------|
| `duration` | number | 0.8 | Duración de la animación (segundos) |
| `delay` | number | 0 | Delay antes de empezar (segundos) |
| `ease` | string | 'power2.out' | Easing function (power1.out, power2.out, back.out, elastic.out, etc.) |
| `y` | number | 50 | Movimiento vertical inicial (negativo = arriba, positivo = abajo) |
| `x` | number | 0 | Movimiento horizontal inicial |
| `opacity` | number | 0 | Opacidad inicial (0 = invisible) |
| `scale` | number | 1 | Escala inicial (0.8 = 80%) |
| `rotation` | number | 0 | Rotación inicial (grados) |

## Métodos de uso

### 1. Componente Wrapper (Recomendado - Más fácil)

```tsx
import { ScrollReveal, ScrollRevealUp, ScrollRevealScale } from '@/components/ScrollReveal';

// Uso simple
<ScrollRevealUp>
  <h2 className="text-3xl font-bold">Mi Título</h2>
</ScrollRevealUp>

// Uso con opciones
<ScrollReveal y={100} duration={1} delay={0.2} opacity={0}>
  <p>Contenido que entra desde abajo</p>
</ScrollReveal>

// Presets
<ScrollRevealScale delay={0.1}>
  <div>Escala hacia arriba</div>
</ScrollRevealScale>
```

### 2. Hook `useScrollReveal` (Control directo)

```tsx
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function MyComponent() {
  const ref = useScrollReveal({
    duration: 0.8,
    y: 50,
    opacity: 0,
    ease: 'power2.out',
  });

  return (
    <div ref={ref}>
      <h3>Contenido animado</h3>
    </div>
  );
}
```

### 3. Funciones diretas (Control total)

```tsx
import { createScrollReveal, AnimationPresets } from '@/lib/gsap-animations';

useEffect(() => {
  const element = document.querySelector('.mi-elemento');
  if (element) {
    createScrollReveal(element, AnimationPresets.slideInUp, {
      start: 'top 80%',
      delay: 0.2,
    });
  }
}, []);
```

## Presets de Animaciones

```tsx
import { AnimationPresets } from '@/lib/gsap-animations';

// slideInDown    - Slide desde arriba
// slideInUp      - Slide desde abajo
// slideInLeft    - Slide desde izquierda
// slideInRight   - Slide desde derecha
// fadeIn         - Solo fade
// scaleUp        - Aparecer escalado
// scaleDown      - Aparecer desde mayor escala
// rotateIn       - Rotar mientras aparece
// slideScaleUp   - Combinación slide + scale
// elasticBounce  - Efecto bounce
// flipIn         - Efecto flip 3D
```

## Easing Functions (Más comunes)

```
- 'power1.out', 'power2.out', 'power3.out' - Polinómial
- 'back.out', 'back.inOut' - Efecto atrás
- 'elastic.out(1, 0.5)' - Efecto elástico
- 'bounce.out' - Efecto rebote
- 'circ.out', 'sine.out' - Suave circular
- 'expo.out' - Exponencial
```

## Ejemplos Prácticos

### Ejemplo 1: Hero Section con múltiples elementos
```tsx
<ScrollRevealDown duration={0.6}>
  <h1>Título Principal</h1>
</ScrollRevealDown>

<ScrollRevealUp duration={0.8} delay={0.2}>
  <p>Subtítulo</p>
</ScrollRevealUp>

<ScrollRevealScale delay={0.4}>
  <button>CTA Button</button>
</ScrollRevealScale>
```

### Ejemplo 2: Card con fade
```tsx
<ScrollRevealFade delay={0.1}>
  <div className="card">
    <img src="" alt="" />
    <h3>Card Title</h3>
    <p>Card description</p>
  </div>
</ScrollRevealFade>
```

### Ejemplo 3: Galería con stagger
```tsx
import { useScrollRevealStagger } from '@/hooks/useScrollReveal';

export function Gallery() {
  const containerRef = useScrollRevealStagger({
    stagger: 0.1,
    y: 60,
    opacity: 0,
  });

  return (
    <div ref={containerRef}>
      {items.map((item) => (
        <div key={item.id} data-animate>
          {item.content}
        </div>
      ))}
    </div>
  );
}
```

### Ejemplo 4: Animación personalizada con ease
```tsx
<ScrollReveal
  y={80}
  opacity={0}
  duration={1}
  ease="elastic.out(1, 0.3)"
  delay={0.1}
>
  <h2>Efecto Elastic</h2>
</ScrollReveal>
```

## Debugging

Para ver los markers de ScrollTrigger (solo en desarrollo):

```tsx
const ref = useScrollReveal({
  markers: true, // ↓ Verás líneas rojas en el viewport
  y: 50,
});
```

## Performance Tips

1. **Usa `delay` para no sobrecargar animaciones**
   ```tsx
   <ScrollRevealUp delay={0.1}>Item 1</ScrollRevealUp>
   <ScrollRevealUp delay={0.2}>Item 2</ScrollRevealUp>
   <ScrollRevealUp delay={0.3}>Item 3</ScrollRevealUp>
   ```

2. **Evita animar elementos fuera de viewport**
   - GSAP ScrollTrigger ya lo optimiza automáticamente

3. **Usa `will-change` en CSS para elementos complejos**
   ```css
   .animated-element {
     will-change: transform, opacity;
   }
   ```

4. **Para listas grandes, usa stagger en lugar de múltiples hooks**
   ```tsx
   // ❌ No recomendado (mucho overhead)
   {items.map(item => <ScrollRevealUp key={item.id}>{item}</ScrollRevealUp>)}
   
   // ✅ Recomendado
   <ScrollRevealStaggerContainer>
     {items.map(item => <div key={item.id} data-animate>{item}</div>)}
   </ScrollRevealStaggerContainer>
   ```

## Documentación oficial

- [GSAP Docs](https://greensock.com/docs)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
