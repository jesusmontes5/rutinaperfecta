# 🎬 Guía: Cómo Agregar Videos a Body Exercise Explorer

## 📁 Estructura de Carpetas

```
public/
└── videos/
    └── exercises/
        ├── press-banca.mp4
        ├── flexiones.mp4
        ├── aperturas.mp4
        ├── pec-deck.mp4
        ├── dominadas.mp4
        ├── remo-horizontal.mp4
        ├── jalon-frontal.mp4
        ├── peso-muerto.mp4
        ├── press-hombros.mp4
        ├── elevaciones-laterales.mp4
        ├── elevaciones-frontales.mp4
        ├── remo-vertical.mp4
        ├── curls-biceps.mp4
        ├── fondos-triceps.mp4
        ├── extensiones-triceps.mp4
        ├── curls-martillo.mp4
        ├── crunches.mp4
        ├── planchas.mp4
        ├── levantamientos-piernas.mp4
        ├── rotaciones-rusas.mp4
        ├── sentadillas.mp4
        ├── prensa-piernas.mp4
        ├── flexiones-piernas.mp4
        └── pmr.mp4
```

---

## 📝 Requisitos de Video

### Especificaciones Técnicas

| Aspecto | Requerimiento |
|--------|---------------|
| **Formato** | MP4 (H.264 codec) |
| **Duración** | 3-6 segundos |
| **Resolución** | 1080p (1920x1080) o 720p |
| **FPS** | 24-30 fps |
| **Bitrate** | 2-5 Mbps |
| **Tamaño Archivo** | 1-5 MB |
| **Audio** | No requiere (siempre será muted) |
| **Loop** | Diseñado para repetir sin cortes |

### Codec Detallado

```
Video: H.264 (AVC)
Audio: AAC (aunque será muted en app)
Container: MP4
Perfil: Baseline (max compatibilidad)
Level: 3.1 o 4.0
```

---

## 🛠️ Cómo Comprimir Videos

### Opción 1: FFmpeg (Recomendado)

**Instalación:**
```bash
# Windows (usando chocolatey)
choco install ffmpeg

# macOS
brew install ffmpeg

# Linux (Ubuntu/Debian)
sudo apt-get install ffmpeg
```

**Comando Básico:**
```bash
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 22 \
  -s 1920x1080 -r 30 -c:a aac output.mp4
```

**Explicación:**
- `-i input.mov` → Archivo de entrada
- `-c:v libx264` → Codec video H.264
- `-preset slow` → Calidad alta (+tiempo compilación)
- `-crf 22` → Calidad (0-51, menor = mejor, 22 = recomendado)
- `-s 1920x1080` → Resolución
- `-r 30` → 30 frames por segundo
- `-c:a aac` → Codec audio AAC

**Ejemplo:**
```bash
ffmpeg -i sentadilla.mov -c:v libx264 -preset slow -crf 22 \
  -s 1920x1080 -r 30 -c:a aac sentadillas.mp4
```

**Resultado aproximado:** 2-3 MB para 6 segundos

---

### Opción 2: Handbrake (GUI)

1. Descargar: https://handbrake.fr/
2. Abrir video
3. Configurar:
   - Video Codec: H.264
   - Quality: 22 (RF)
   - Framerate: 30 fps
   - Resolution: 1920x1080
4. Exportar como MP4

---

### Opción 3: Compressor.io Online

Para videos simples:
1. Ir a: https://www.compressor.io/
2. Seleccionar video
3. Elegir MP4
4. Descargar

---

## 📤 Cargar Videos a la Aplicación

### Paso 1: Crear Carpeta
```bash
mkdir -p public/videos/exercises
```

### Paso 2: Copiar Videos
```bash
# Copiar archivo individual
cp sentadillas.mp4 public/videos/exercises/

# Copiar múltiples archivos (bash)
cp *.mp4 public/videos/exercises/

# Copiar múltiples archivos (PowerShell)
Copy-Item *.mp4 -Destination "public/videos/exercises/"
```

### Paso 3: Verificar Rutas
```bash
ls public/videos/exercises/
# Debería ver todos los archivos .mp4
```

---

## ✅ Actualizar Base de Datos

**Archivo:** `lib/exerciseDatabase.ts`

```ts
{
  id: 'chest-001',
  name: 'Press de Banca',
  bodyPart: 'chest',
  description: 'Ejercicio fundamental para desarrollar pecho',
  media: '/videos/exercises/press-banca.mp4',  // ← Ruta correcta
  reps: '8-12',
  sets: 4,
  difficulty: 'intermediate',
}
```

**Importante:** La ruta debe ser exacta y coincidir con el nombre del archivo.

---

## 🎥 Guía de Grabación

### Setup Recomendado

**Equipo Mínimo:**
- Smartphone o cámara
- Luz natural o ringlight
- Fondo neutral (blanco, gris, negro)
- Espacio mínimo: 1.5m x 1.5m

**Ángulo de Cámara:**
- Lateral (perfil): muestra forma del movimiento
- Frontal: muestra alineación
- Múltiples ángulos: mejor para entrenadores

### Grabación

```
Estructura de video:
1. Posición inicial (0-0.5s)
2. Movimiento concéntrico (0.5-2.5s)
3. Posición final (2.5-3s)
4. Retorno (3-5s)
5. Repeat o freeze (5-6s)

Duración total: 3-6 segundos
```

### Tips de Grabación

✓ Grabar en 1080p o superior
✓ Buena iluminación (evita sombras)
✓ Enfoque en forma correcta
✓ Audio opcional (será muted)
✓ Considerar velocidad lenta (0.75x-1x)
✓ Grabación limpia sin interrupciones

---

## 📊 Batch Processing

### Script Python para Convertir Múltiples Videos

```python
#!/usr/bin/env python3

import os
import subprocess
from pathlib import Path

# Configuración
INPUT_DIR = "videos_raw"
OUTPUT_DIR = "public/videos/exercises"
RESOLUTION = "1920x1080"
FPS = "30"
CRF = "22"

# Crear directorio de salida
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Procesar cada video
for video_file in Path(INPUT_DIR).glob("*.mov"):
    output_file = Path(OUTPUT_DIR) / video_file.stem.replace(" ", "-").lower() + ".mp4"
    
    if output_file.exists():
        print(f"⏭️  Saltando {output_file.name} (ya existe)")
        continue
    
    print(f"📹 Procesando: {video_file.name}...")
    
    cmd = [
        "ffmpeg",
        "-i", str(video_file),
        "-c:v", "libx264",
        "-preset", "slow",
        "-crf", CRF,
        "-s", RESOLUTION,
        "-r", FPS,
        "-c:a", "aac",
        str(output_file)
    ]
    
    try:
        subprocess.run(cmd, check=True)
        print(f"✓ {output_file.name} completado")
    except subprocess.CalledProcessError as e:
        print(f"✗ Error procesando {video_file.name}: {e}")

print("✓ Conversión completada")
```

**Cómo ejecutar:**
```bash
python convert_videos.py
```

---

## 🧪 Pruebas

### Verificar Videos

```bash
# Información de video
ffprobe public/videos/exercises/sentadillas.mp4

# Esperado:
# Duration: 00:00:05, start: 0.000000, bitrate: 3000 kb/s
# Video: h264 (Main), 1920x1080, 30 fps, 30 tbr
```

### En el Navegador

1. Abrir DevTools (F12)
2. Network tab
3. Seleccionar zona en app
4. Revisar:
   - Videos cargan (status 200)
   - Tamaño < 5 MB
   - Tiempo de carga < 1 seg

---

## 📈 Optimización Avanzada

### Usar Múltiples Bitrates

Para soporte en diferentes conexiones:

```bash
# HD (1080p)
ffmpeg -i input.mov -c:v libx264 -preset fast -crf 20 \
  -s 1920x1080 -r 30 output_1080p.mp4

# SD (720p)
ffmpeg -i input.mov -c:v libx264 -preset fast -crf 22 \
  -s 1280x720 -r 30 output_720p.mp4

# Low (480p)
ffmpeg -i input.mov -c:v libx264 -preset fast -crf 24 \
  -s 854x480 -r 30 output_480p.mp4
```

En `ExerciseCard.tsx`:
```tsx
<video>
  <source src="/videos/exercises/sentadillas_1080p.mp4" type="video/mp4" />
  <source src="/videos/exercises/sentadillas_720p.mp4" type="video/mp4" />
  <source src="/videos/exercises/sentadillas_480p.mp4" type="video/mp4" />
</video>
```

---

## 🚀 Deployment

### Antes de Subir a Producción

✓ Verificar todas las rutas
✓ Probar en diferentes navegadores
✓ Validar tamaños de archivo
✓ Revisar video quality
✓ Probar en conexión lenta
✓ Verificar autorización de recursos

### En Vercel/Netlify

Los videos en `/public` se sirven automáticamente:
```
https://tuapp.vercel.app/videos/exercises/sentadillas.mp4
```

### En Servidor Propio

Configurar CORS si es necesario:
```ts
// next.config.js
module.exports = {
  headers: async () => {
    return [
      {
        source: '/videos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};
```

---

## ❓ Troubleshooting

| Problema | Solución |
|----------|----------|
| Video no reproduce | Verificar formato MP4 H.264 y ruta |
| Video freezed | Asegurar duracion 3-6 seg |
| Audio distorsionado | No necesario, usar `-an` para remover |
| Archivo muy grande | Aumentar CRF (22→24) o reducir resolución |
| Movimiento pixelado | Reducir CRF (22→20) o aumentar bitrate |
| Safari no reproduce | Usar Main profile H.264, no High |

---

## 📚 Recursos

- **FFmpeg Docs:** https://ffmpeg.org/documentation.html
- **Video Encoding:** https://trac.ffmpeg.org/wiki/Encode/H.264
- **Handbrake:** https://handbrake.fr/
- **Online Converter:** https://cloudconvert.com/

---

## ✨ Siguiente Paso

Una vez tengas los videos comprimidos:

1. Coloca en `public/videos/exercises/`
2. Verifica rutas en `exerciseDatabase.ts`
3. Prueba en tu app: `/body-explorer`
4. ¡Disfruta! 🎉

---

**Cualquier duda?** Revisa BODY_EXPLORER_GUIDE.md
