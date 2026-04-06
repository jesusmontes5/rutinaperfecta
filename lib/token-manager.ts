/**
 * Token Manager - Gestión inteligente de límites API
 * Implementa: cache, rate limiting, fallbacks, alertas
 */

interface TokenConfig {
  monthlyLimit: number;
  warningThreshold: number; // 75% del límite
  criticalThreshold: number; // 90% del límite
  dailyLimit?: number;
}

// Configuración por defecto (ajustar según plan de Groq)
const DEFAULT_CONFIG: TokenConfig = {
  monthlyLimit: 100000, // Tokens por mes
  warningThreshold: 75000,
  criticalThreshold: 90000,
  dailyLimit: 5000, // Tokens por día aprox
};

// Cache en memoria (considerar usar Redis en producción)
const routineCache: Map<string, { description: string; tips: string[]; timestamp: number }> = new Map();
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 días

// Rastreo de uso
let monthlyUsage = 0;
let dailyUsage = 0;
let lastResetDate = new Date().toDateString();

/**
 * Calcula hash para cache key (basado en parámetros)
 */
export function getCacheKey(objective: string, level: string, days: number): string {
  return `routine_${objective}_${level}_${days}`;
}

/**
 * Verifica si hay disponibilidad de tokens
 */
export function canMakeAPICall(estimatedTokens: number = 100): {
  allowed: boolean;
  reason: string;
  status: 'ok' | 'warning' | 'critical' | 'blocked';
} {
  // Reset diario si es necesario
  const today = new Date().toDateString();
  if (today !== lastResetDate) {
    dailyUsage = 0;
    lastResetDate = today;
  }

  // Verificaciones en orden de criticidad
  if (monthlyUsage + estimatedTokens > DEFAULT_CONFIG.monthlyLimit) {
    return {
      allowed: false,
      reason: `Límite mensual alcanzado: ${monthlyUsage}/${DEFAULT_CONFIG.monthlyLimit} tokens`,
      status: 'blocked',
    };
  }

  if (dailyUsage + estimatedTokens > (DEFAULT_CONFIG.dailyLimit || 5000)) {
    return {
      allowed: false,
      reason: `Límite diario alcanzado: ${dailyUsage}/${DEFAULT_CONFIG.dailyLimit} tokens hoy`,
      status: 'blocked',
    };
  }

  if (monthlyUsage + estimatedTokens > DEFAULT_CONFIG.criticalThreshold) {
    return {
      allowed: true,
      reason: `⚠️ CRÍTICO: ${monthlyUsage + estimatedTokens}/${DEFAULT_CONFIG.monthlyLimit} tokens`,
      status: 'critical',
    };
  }

  if (monthlyUsage + estimatedTokens > DEFAULT_CONFIG.warningThreshold) {
    return {
      allowed: true,
      reason: `⚠️ Precaución: ${monthlyUsage + estimatedTokens}/${DEFAULT_CONFIG.monthlyLimit} tokens`,
      status: 'warning',
    };
  }

  return {
    allowed: true,
    reason: `OK: ${monthlyUsage + estimatedTokens}/${DEFAULT_CONFIG.monthlyLimit} tokens`,
    status: 'ok',
  };
}

/**
 * Registra el uso de tokens
 */
export function recordTokenUsage(endpoint: string, tokensUsed: number, success: boolean = true): void {
  monthlyUsage += tokensUsed;
  dailyUsage += tokensUsed;

  // Log para debugging
  console.log(`📊 Token Usage: +${tokensUsed} tokens from ${endpoint} (Monthly: ${monthlyUsage}, Daily: ${dailyUsage}, Success: ${success})`);
}

/**
 * Intenta obtener del cache (estrategia: similar profiles)
 */
export function getFromCache(cacheKey: string): {
  description: string;
  tips: string[];
} | null {
  const cached = routineCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log(`✅ Cache HIT: ${cacheKey}`);
    return {
      description: cached.description,
      tips: cached.tips,
    };
  }

  if (cached) {
    routineCache.delete(cacheKey); // Limpiar expirado
  }

  return null;
}

/**
 * Guarda en cache
 */
export function saveToCache(cacheKey: string, description: string, tips: string[]): void {
  routineCache.set(cacheKey, {
    description,
    tips,
    timestamp: Date.now(),
  });
  console.log(`💾 Cached: ${cacheKey}`);
}

/**
 * Obtiene estadísticas de uso
 */
export function getTokenStats() {
  const monthlyPercent = ((monthlyUsage / DEFAULT_CONFIG.monthlyLimit) * 100).toFixed(1);
  const dailyPercent =
    DEFAULT_CONFIG.dailyLimit ? ((dailyUsage / DEFAULT_CONFIG.dailyLimit) * 100).toFixed(1) : 'N/A';

  return {
    monthly: {
      used: monthlyUsage,
      limit: DEFAULT_CONFIG.monthlyLimit,
      percentage: monthlyPercent,
    },
    daily: {
      used: dailyUsage,
      limit: DEFAULT_CONFIG.dailyLimit,
      percentage: dailyPercent,
    },
    cacheSize: routineCache.size,
  };
}

/**
 * Resetea estadísticas (solo admin)
 */
export function resetTokenStats(): void {
  monthlyUsage = 0;
  dailyUsage = 0;
  lastResetDate = new Date().toDateString();
  console.log('🔄 Token stats reset');
}

/**
 * Obtiene modo fallback automático
 */
export function getFallbackMode(): 'full_ai' | 'hybrid' | 'cache_only' | 'fallback_only' {
  const status = canMakeAPICall();

  if (!status.allowed && status.status === 'blocked') {
    return 'fallback_only'; // Solo fallbacks locales
  }

  if (status.status === 'critical') {
    return 'cache_only'; // Solo del cache
  }

  if (status.status === 'warning') {
    return 'hybrid'; // Cache + IA selectiva
  }

  return 'full_ai'; // Llamadas normales a IA
}

/**
 * Limpia cache (útil para testing o mantenimiento)
 */
export function clearCache(): void {
  routineCache.clear();
  console.log('🗑️ Cache cleared');
}



const tokenManager = {
  getCacheKey,
  canMakeAPICall,
  recordTokenUsage,
  getFromCache,
  saveToCache,
  getTokenStats,
  resetTokenStats,
  getFallbackMode,
  clearCache,
};

export default tokenManager;
