# 📤 Cómo Subir a GitHub - 3 Formas Fáciles

## ✅ OPCIÓN 1: Script Automático (RECOMENDADO)

Simplemente ejecuta:
```bash
push-to-github.bat
```

El script hace todo automáticamente.

---

## ✅ OPCIÓN 2: GitHub Web (Arrastra y suelta)

1. Ve a: https://github.com/jesusmontes5/rutinaperfecta
2. Click en **"Add file"** → **"Upload files"**
3. **Arrastra la carpeta completa** del proyecto
4. Escribe mensaje: `Initial commit: Lenis animations + env setup`
5. Click en **"Commit changes"**

**Tarda ~2 minutos. Todo se sube automático.**

---

## ✅ OPCIÓN 3: GitHub Desktop (Aplicación)

1. Descarga: https://desktop.github.com
2. Abre GitHub Desktop
3. Selecciona tu carpeta del proyecto
4. Click en **"Publish branch"**
5. **Listo.**

**Interfaz gráfica, muy fácil.**

---

## ✅ OPCIÓN 4: VS Code (Integrado)

1. Abre VS Code
2. Panels → **Source Control** (icono de rama)
3. Escribe mensaje de commit
4. Click en **✓ Commit**
5. Click en **Sync Changes**

**Todo en el editor, sin terminal.**

---

## 📋 ¿Cuál Elegir?

| Opción | Dificultad | Tiempo | Recomendado para |
|--------|-----------|--------|------------------|
| Script .bat | Muy Fácil | 30 seg | Línea de comando |
| GitHub Web | Fácil | 2 min | Sin instalar nada |
| GitHub Desktop | Fácil | 1 min | Interfaz gráfica |
| VS Code | Muy Fácil | 1 min | Dentro del editor |

---

## 🚀 Próximo Paso: Vercel

Una vez subido a GitHub:

1. Ve a https://vercel.com/new
2. Click en **"Import Git Repository"**
3. Selecciona `rutinaperfecta`
4. Agrega variables de entorno (ver **VERCEL_DEPLOYMENT.md**)
5. Click en **"Deploy"**

**Tu sitio estará en vivo en ~2 minutos.**

---

## 📁 Qué Se Subirá

✅ Todo el código
✅ Configuración de animaciones
✅ Variables de entorno (.env.example)
✅ Documentación

❌ NO se sube: .env.local (protegido en .gitignore)

---

## ✔️ Verificar que Se Subió

Después de subir, verifica en:
https://github.com/jesusmontes5/rutinaperfecta

Deberías ver:
- 3 carpetas: `app/`, `components/`, `lib/`, etc
- 3 commits en history
- Archivos VERCEL_DEPLOYMENT.md y CUSTOM_DOMAIN.md

---

¿Cuál forma prefieres usar? 👇
