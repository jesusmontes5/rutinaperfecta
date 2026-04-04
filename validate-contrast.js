#!/usr/bin/env node

/**
 * Validación de Contraste - Minimalista Fix
 * Verifica que todos los elementos del formulario tengan contraste correcto
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_FIXES = {
  'components/WizardForm.tsx': [
    { pattern: "bg-gold-primary text-white", description: "Botones seleccionados con contraste" },
    { pattern: "bg-white text-color-text border-gold-light/30", description: "Botones no seleccionados con contraste" },
  ],
  'app/contacto/page.tsx': [
    { pattern: "bg-white text-color-text placeholder-color-text-muted/50", description: "Inputs con contraste correcto" },
    { pattern: "bg-gradient-to-r from-gold-primary to-gold-dark text-white", description: "Botón submit con contraste" },
  ],
  'app/globals.css': [
    { pattern: "--color-text: #1a1a1a", description: "Variable CSS text color definida" },
    { pattern: "--color-text-muted: #666666", description: "Variable CSS text muted definida" },
  ]
};

let allValid = true;

console.log('🔍 Validando contraste de formularios...\n');

Object.entries(REQUIRED_FIXES).forEach(([file, checks]) => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ARCHIVO NO ENCONTRADO: ${file}`);
    allValid = false;
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  let fileValid = true;
  
  console.log(`📄 Verificando: ${file}`);
  
  checks.forEach(({ pattern, description }) => {
    if (content.includes(pattern)) {
      console.log(`   ✅ ${description}`);
    } else {
      console.log(`   ❌ FALTA: ${description}`);
      console.log(`      Buscando: "${pattern}"`);
      fileValid = false;
      allValid = false;
    }
  });
  
  console.log('');
});

// Validaciones adicionales
console.log('🎨 Validaciones adicionales:\n');

// Verificar que no hay texto blanco en inputs
const wizardContent = fs.readFileSync(path.join(__dirname, 'components/WizardForm.tsx'), 'utf-8');
const contactContent = fs.readFileSync(path.join(__dirname, 'app/contacto/page.tsx'), 'utf-8');

// Buscar patrones problemáticos
const badPatterns = [
  { regex: /text-white.*bg-white/, description: "Texto blanco sobre fondo blanco (MALO)" },
  { regex: /text-gray-900.*bg-white/, description: "Gris oscuro sobre blanco (OK, pero revisar)" },
];

let additionalIssuesFound = false;

badPatterns.forEach(({ regex, description }) => {
  if (regex.test(wizardContent) || regex.test(contactContent)) {
    console.log(`   ⚠️  REVISAR: ${description}`);
    additionalIssuesFound = true;
  }
});

if (!additionalIssuesFound) {
  console.log(`   ✅ Sin patrones de contraste problemáticos detectados`);
}

console.log('\n' + '='.repeat(50));
if (allValid) {
  console.log('✅ VALIDACIÓN EXITOSA - Todos los cambios aplicados correctamente');
  process.exit(0);
} else {
  console.log('❌ VALIDACIÓN FALLIDA - Se encuentran inconsistencias');
  process.exit(1);
}
