// Utility functions for Planck App

/**
 * クラス名を条件付きで結合する
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * 数値をフォーマットして表示する
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

/**
 * 相対時間を日本語で表示
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds}秒前`
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分前`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}時間前`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays}日前`
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return `${diffInWeeks}週間前`
  }
  
  return date.toLocaleDateString('ja-JP')
}

/**
 * 座標を度分秒形式でフォーマット
 */
export function formatCoordinates(lat: number, lng: number): string {
  const formatDMS = (decimal: number, isLatitude: boolean): string => {
    const absolute = Math.abs(decimal)
    const degrees = Math.floor(absolute)
    const minutes = Math.floor((absolute - degrees) * 60)
    const seconds = Math.floor(((absolute - degrees) * 60 - minutes) * 60)
    
    const direction = decimal >= 0 
      ? (isLatitude ? 'N' : 'E') 
      : (isLatitude ? 'S' : 'W')
    
    return `${degrees}°${minutes}'${seconds}"${direction}`
  }
  
  return `${formatDMS(lat, true)}, ${formatDMS(lng, false)}`
}

/**
 * レベルから必要XPを計算
 */
export function calculateRequiredXP(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1))
}

/**
 * XPからレベルを計算
 */
export function calculateLevel(totalXP: number): number {
  let level = 1
  let requiredXP = 0
  
  while (requiredXP <= totalXP) {
    requiredXP += calculateRequiredXP(level)
    if (requiredXP <= totalXP) {
      level++
    }
  }
  
  return level
}

/**
 * パーセンテージを計算
 */
export function calculatePercentage(current: number, total: number): number {
  if (total === 0) return 0
  return Math.min(100, Math.max(0, (current / total) * 100))
}

/**
 * 配列をシャッフル
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * ランダムな文字列を生成
 */
export function generateRandomId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 地球上の2点間の距離を計算（Haversine公式）
 */
export function calculateDistance(
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number {
  const R = 6371 // 地球の半径（km）
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

/**
 * クエリの複雑さを評価
 */
export function evaluateQueryComplexity(query: string): 'simple' | 'medium' | 'complex' {
  const keywords = {
    simple: ['where', 'what', 'show', 'find'],
    medium: ['analyze', 'compare', 'change', 'trend'],
    complex: ['predict', 'simulate', 'correlation', 'forecast', 'optimize']
  }
  
  const lowerQuery = query.toLowerCase()
  
  if (keywords.complex.some(keyword => lowerQuery.includes(keyword))) {
    return 'complex'
  }
  if (keywords.medium.some(keyword => lowerQuery.includes(keyword))) {
    return 'medium'
  }
  return 'simple'
}

/**
 * カラーグラデーションを生成
 */
export function generateGradient(start: string, end: string, steps: number): string[] {
  // 簡単な実装 - 実際にはより高度な色空間変換が必要
  const startRGB = hexToRgb(start)
  const endRGB = hexToRgb(end)
  
  if (!startRGB || !endRGB) return [start, end]
  
  const colors: string[] = []
  
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1)
    const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * ratio)
    const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * ratio)
    const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * ratio)
    colors.push(`rgb(${r}, ${g}, ${b})`)
  }
  
  return colors
}

/**
 * HEXカラーをRGBに変換
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

/**
 * デバウンス関数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(null, args), wait)
  }
}

/**
 * スロットル関数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * ローカルストレージのヘルパー
 */
export const localStorage = {
  get: (key: string, defaultValue?: any) => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Silent fail
    }
  },
  
  remove: (key: string) => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.removeItem(key)
    } catch {
      // Silent fail
    }
  }
}
