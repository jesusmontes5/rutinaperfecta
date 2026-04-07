/**
 * Design Tokens System
 * Centralized design language for consistency across the application
 * Follows atomic design principles and modern CSS variable patterns
 */

export const designTokens = {
  // ===== COLOR SYSTEM =====
  colors: {
    // Primary Gold Palette
    primary: {
      darkest: '#6b5426',
      dark: '#997a3c',
      base: '#b8964f',
      light: '#c9a563',
      lighter: '#e8d5b7',
      lightest: '#f9f6f0',
    },
    // Accent & Complementary
    accent: {
      emerald: '#1fb89f',
      sapphire: '#0066cc',
      coral: '#ff6b6b',
      purple: '#8b5fbf',
    },
    // Neutral System
    neutral: {
      white: '#ffffff',
      offWhite: '#f5f5f7',
      gray100: '#efefef',
      gray200: '#e8e8e8',
      gray300: '#d1d1d6',
      gray400: '#a1a1a6',
      gray500: '#86868b',
      gray600: '#666666',
      gray700: '#424245',
      gray800: '#1d1d1f',
      black: '#000000',
    },
    // Status Colors
    status: {
      success: '#34c759',
      warning: '#ff9500',
      error: '#ff3b30',
      info: '#30b0c0',
    },
  },

  // ===== TYPOGRAPHY SYSTEM =====
  typography: {
    fonts: {
      display: "'Playfair Display', serif",
      body: "'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
    scales: {
      // Base size: 16px
      xs: { size: '0.75rem', weight: 400, lineHeight: '1rem' }, // 12px
      sm: { size: '0.875rem', weight: 500, lineHeight: '1.25rem' }, // 14px
      base: { size: '1rem', weight: 400, lineHeight: '1.5rem' }, // 16px
      lg: { size: '1.125rem', weight: 500, lineHeight: '1.75rem' }, // 18px
      xl: { size: '1.25rem', weight: 600, lineHeight: '1.75rem' }, // 20px
      '2xl': { size: '1.5rem', weight: 600, lineHeight: '2rem' }, // 24px
      '3xl': { size: '1.875rem', weight: 700, lineHeight: '2.25rem' }, // 30px
      '4xl': { size: '2.25rem', weight: 800, lineHeight: '2.5rem' }, // 36px
      '5xl': { size: '3rem', weight: 800, lineHeight: '3.5rem' }, // 48px
      '6xl': { size: '3.75rem', weight: 800, lineHeight: '4.5rem' }, // 60px
    },
  },

  // ===== SPACING SYSTEM (8px base) =====
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '2.5rem', // 40px
    '3xl': '3rem', // 48px
    '4xl': '4rem', // 64px
    '5xl': '5rem', // 80px
  },

  // ===== BORDER RADIUS =====
  radius: {
    none: '0',
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '0.75rem', // 12px
    lg: '1rem', // 16px
    xl: '1.5rem', // 24px
    '2xl': '2rem', // 32px
    full: '9999px',
    circle: '50%',
  },

  // ===== SHADOWS (Elevation System) =====
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
    // Gold-specific shadows
    goldSm: '0 4px 6px rgba(153, 122, 60, 0.1)',
    goldMd: '0 10px 15px rgba(153, 122, 60, 0.15)',
    goldLg: '0 20px 25px rgba(153, 122, 60, 0.2)',
    // Inset shadows
    insetSm: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
    insetMd: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
  },

  // ===== TRANSITIONS & ANIMATIONS =====
  transitions: {
    fast: '150ms ease-in-out',
    base: '250ms ease-in-out',
    slow: '350ms ease-in-out',
    slowest: '500ms ease-in-out',
    easing: {
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      ease: 'ease-in-out',
    },
  },

  // ===== BREAKPOINTS & MEDIA QUERIES =====
  breakpoints: {
    xs: '375px', // Small phones
    sm: '640px', // Phones
    md: '768px', // Tablets
    lg: '1024px', // Small laptops
    xl: '1280px', // Laptops
    '2xl': '1536px', // Desktops
  },

  // ===== Z-INDEX SYSTEM =====
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    backdrop: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
    notification: 80,
    floatingButton: 40,
    navbar: 100,
  },

  // ===== ASPECT RATIOS =====
  aspectRatios: {
    square: '1 / 1',
    video: '16 / 9',
    image: '4 / 3',
    golden: '1.618 / 1',
    tall: '2 / 3',
    wide: '21 / 9',
  },

  // ===== CONTAINER SIZES =====
  containers: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    full: '100%',
  },
} as const;

// ===== CSS VARIABLE GENERATOR =====
export const generateCSSVariables = (): string => {
  let cssVars = ':root {\n';

  // Color variables
  Object.entries(designTokens.colors).forEach(([category, colorObj]) => {
    if (typeof colorObj === 'object') {
      Object.entries(colorObj).forEach(([key, value]) => {
        cssVars += `  --color-${category}-${key}: ${value};\n`;
      });
    }
  });

  // Spacing variables
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    cssVars += `  --spacing-${key}: ${value};\n`;
  });

  // Border radius variables
  Object.entries(designTokens.radius).forEach(([key, value]) => {
    cssVars += `  --radius-${key}: ${value};\n`;
  });

  // Shadow variables
  Object.entries(designTokens.shadows).forEach(([key, value]) => {
    cssVars += `  --shadow-${key}: ${value};\n`;
  });

  // Transition variables
  Object.entries(designTokens.transitions).forEach(([key, value]) => {
    if (typeof value === 'string' && !key.includes('easing')) {
      cssVars += `  --transition-${key}: ${value};\n`;
    }
  });

  cssVars += '}\n';
  return cssVars;
};

// ===== UTIL: Get spacing multiplier =====
export const getSpacing = (multiplier: number): string => {
  const baseSpacing = 8; // 8px base
  return `${baseSpacing * multiplier}px`;
};

// ===== UTIL: Get font scale =====
export const getFontScale = (
  scale: keyof typeof designTokens.typography.scales
): string => {
  const s = designTokens.typography.scales[scale];
  return `${s.size} / ${s.lineHeight}`;
};

// ===== UTIL: Get responsive breakpoint =====
export const createMediaQuery = (breakpoint: keyof typeof designTokens.breakpoints): string => {
  return `@media (min-width: ${designTokens.breakpoints[breakpoint]})`;
};

// ===== UTIL: Hsla color helper =====
export const withOpacity = (color: string, opacity: number): string => {
  return `${color.slice(0, -1)}, ${opacity})`.replace('#', 'rgba(');
};
