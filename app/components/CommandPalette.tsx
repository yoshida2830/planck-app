'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, ArrowRight, Clock, TrendingUp } from 'lucide-react'

interface CommandPaletteProps {
  onQuery: (query: string) => void
  isLoading: boolean
  currentQuery: string
}

export default function CommandPalette({ onQuery, isLoading, currentQuery }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestions = [
    { text: '東京湾の埋め立て地の変化を過去5年間で見せて', category: 'urban', icon: '🏙️' },
    { text: 'アマゾンの森林減少が最も激しい地域はどこ？', category: 'environment', icon: '🌳' },
    { text: 'スエズ運河の通行状況を教えて', category: 'logistics', icon: '🚢' },
    { text: '北極の氷河の融解速度を分析して', category: 'climate', icon: '🧊' },
    { text: '世界の主要都市の夜間光度を比較して', category: 'urban', icon: '💡' },
    { text: '台風の進路予測と影響範囲を表示して', category: 'weather', icon: '🌪️' },
  ]

  const recentQueries = [
    '富士山周辺の植生変化',
    '東京オリンピック会場の建設進捗',
    '沖縄の海岸線変化',
  ]

  const trendingQueries = [
    'ウクライナ情勢の衛星画像分析',
    '中国の新疆ウイグル地区の変化',
    'カリフォルニア山火事の被害状況',
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isFocused) {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setShowSuggestions(false)
        inputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFocused])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && !isLoading) {
      onQuery(query.trim())
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    onQuery(suggestion)
    setShowSuggestions(false)
  }

  const categoryColors = {
    urban: 'from-blue-500 to-cyan-500',
    environment: 'from-green-500 to-emerald-500',
    logistics: 'from-purple-500 to-pink-500',
    climate: 'from-cyan-500 to-blue-500',
    weather: 'from-orange-500 to-red-500',
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* メインコマンドパレット */}
      <motion.div
        className="command-palette rounded-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.02 }}
      >
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center p-6">
            {/* アイコン */}
            <motion.div
              className="mr-4"
              animate={isLoading ? { rotate: 360 } : {}}
              transition={isLoading ? { duration: 2, repeat: Infinity, ease: 'linear' } : {}}
            >
              {isLoading ? (
                <div className="spinner" />
              ) : (
                <Search className="w-6 h-6 text-primary-400" />
              )}
            </motion.div>

            {/* 入力フィールド */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                setIsFocused(true)
                setShowSuggestions(true)
              }}
              onBlur={() => {
                setIsFocused(false)
                setTimeout(() => setShowSuggestions(false), 200)
              }}
              placeholder={isLoading ? "分析中..." : "地球について何でも聞いてください... (Press '/' to focus)"}
              className="flex-1 bg-transparent text-white placeholder-gray-400 text-lg outline-none disabled:opacity-50"
              disabled={isLoading}
            />

            {/* 送信ボタン */}
            <motion.button
              type="submit"
              className="ml-4 p-3 bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl hover:from-primary-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!query.trim() || isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* プログレスバー（ローディング時） */}
          {isLoading && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          )}
        </form>

        {/* ヒントテキスト */}
        {!isFocused && !isLoading && (
          <motion.div
            className="px-6 pb-4 text-sm text-gray-400 flex items-center justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-1">
              <Sparkles className="w-4 h-4" />
              <span>AIが地球を分析します</span>
            </div>
            <div className="text-gray-500">•</div>
            <div>自然言語で質問可能</div>
          </motion.div>
        )}
      </motion.div>

      {/* サジェスチョンパネル */}
      <AnimatePresence>
        {showSuggestions && !isLoading && (
          <motion.div
            className="absolute top-full mt-4 w-full glass-dark rounded-2xl border border-white/20 overflow-hidden z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 space-y-6">
              {/* おすすめクエリ */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-primary-400" />
                  <span>おすすめクエリ</span>
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {suggestions.slice(0, 4).map((suggestion, index) => (
                    <motion.button
                      key={index}
                      className="text-left p-3 rounded-lg hover:bg-white/5 transition-all duration-200 group"
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${categoryColors[suggestion.category as keyof typeof categoryColors]} flex items-center justify-center text-sm`}>
                          {suggestion.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white group-hover:text-primary-300 transition-colors">
                            {suggestion.text}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">{suggestion.category}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-primary-400 transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* 最近のクエリとトレンド */}
              <div className="grid grid-cols-2 gap-6">
                {/* 最近のクエリ */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>最近のクエリ</span>
                  </h3>
                  <div className="space-y-1">
                    {recentQueries.map((recentQuery, index) => (
                      <button
                        key={index}
                        className="block text-left text-sm text-gray-400 hover:text-white transition-colors p-2 rounded hover:bg-white/5 w-full"
                        onClick={() => handleSuggestionClick(recentQuery)}
                      >
                        {recentQuery}
                      </button>
                    ))}
                  </div>
                </div>

                {/* トレンドクエリ */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-red-400" />
                    <span>トレンド</span>
                  </h3>
                  <div className="space-y-1">
                    {trendingQueries.map((trendQuery, index) => (
                      <button
                        key={index}
                        className="block text-left text-sm text-gray-400 hover:text-white transition-colors p-2 rounded hover:bg-white/5 w-full"
                        onClick={() => handleSuggestionClick(trendQuery)}
                      >
                        {trendQuery}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
