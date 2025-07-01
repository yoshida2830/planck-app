// Global type definitions for Planck App

export interface UserProgress {
  level: number
  xp: number
  totalXp: number
  badges: string[]
  discoveries: number
}

export interface QueryResult {
  id: string
  query: string
  result: string
  type: 'analysis' | 'discovery' | 'monitoring'
  timestamp: Date
  location?: { lat: number; lng: number }
  imagery?: string
  confidence?: number
  processingTime?: number
}

export interface Quest {
  id: string
  title: string
  description: string
  category: 'daily' | 'weekly' | 'special' | 'hidden'
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary'
  xpReward: number
  progress: number
  maxProgress: number
  completed: boolean
  timeLimit?: Date
  icon: string
  requirements?: string[]
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: Date
}

export interface Community {
  id: string
  name: string
  memberCount: number
  description: string
  avatar: string
  isOnline: boolean
}

export interface Insight {
  id: string
  title: string
  description: string
  category: string
  price: number
  creator: string
  rating: number
  downloads: number
  tags: string[]
  createdAt: Date
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface GeospatialData {
  type: 'FeatureCollection' | 'Feature'
  features?: GeoFeature[]
  geometry?: Geometry
  properties?: Record<string, any>
}

export interface GeoFeature {
  type: 'Feature'
  geometry: Geometry
  properties: Record<string, any>
}

export interface Geometry {
  type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'
  coordinates: number[] | number[][] | number[][][]
}

export interface AnalysisRequest {
  query: string
  parameters?: {
    region?: {
      lat: number
      lng: number
      radius?: number
    }
    timeRange?: {
      start: Date
      end: Date
    }
    dataSource?: string[]
    analysisType?: string
  }
}

export interface SatelliteData {
  id: string
  source: string
  timestamp: Date
  bands: string[]
  resolution: number
  cloudCover: number
  geometry: Geometry
  metadata: Record<string, any>
}

// Environment Variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string
      OPENAI_API_KEY: string
      GOOGLE_EARTH_ENGINE_API_KEY: string
      DATABASE_URL: string
      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string
      DISCORD_CLIENT_ID: string
      DISCORD_CLIENT_SECRET: string
      GOOGLE_ANALYTICS_ID?: string
      POSTHOG_KEY?: string
      NEXT_PUBLIC_ENABLE_ANALYTICS: string
      NEXT_PUBLIC_ENABLE_COMMUNITY: string
      NEXT_PUBLIC_ENABLE_PREMIUM_FEATURES: string
      NODE_ENV: 'development' | 'production' | 'test'
      NEXT_PUBLIC_APP_VERSION: string
    }
  }
}

// Extend Window interface for browser APIs
declare global {
  interface Window {
    gtag?: Function
    posthog?: any
  }
}

export {}
