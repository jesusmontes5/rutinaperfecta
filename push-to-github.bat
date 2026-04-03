@echo off
REM Script para subir proyecto a GitHub
REM Este script configura git y hace push automático

echo.
echo ======================================
echo SUBIENDO PROYECTO A GITHUB
echo ======================================
echo.

REM Verificar que estamos en el directorio correcto
if not exist ".git" (
    echo ERROR: No estamos en un repositorio git
    echo Ejecuta este script desde la carpeta raiz del proyecto
    pause
    exit /b 1
)

REM Mostrar estado actual
echo Estado actual:
git status
echo.

REM Pregunta si quiere continuar
set /p CONTINUE="Deseas subir estos cambios a GitHub? (s/n): "
if /i not "%CONTINUE%"=="s" (
    echo Cancelado.
    exit /b 0
)

echo.
echo Subiendo a GitHub...
echo.

REM Hacer push
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ EXITO! Proyecto subido a GitHub
    echo.
    echo Ver en: https://github.com/jesusmontes5/rutinaperfecta
    echo.
) else (
    echo.
    echo ❌ ERROR al subir. Opciones:
    echo 1. Usar GitHub Desktop (https://desktop.github.com)
    echo 2. Subir manuales en GitHub.com (arrastra archivos)
    echo 3. Generar Personal Access Token en GitHub Settings
    echo.
)

pause
