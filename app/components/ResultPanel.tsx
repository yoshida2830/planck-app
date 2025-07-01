'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Share2, 
  Download, 
  Heart, 
  MapPin, 
  Calendar, 
  Zap,
  TrendingUp,
  Eye,
  Bookmark,
  ChevronRight,
  Play
} from 'lucide-react'
import { useState } from 'react'

interface QueryResult {
  id: string
  query: string
  result: string
  type: 'analysis' | 'discovery' | 'monitoring'
  timestamp: Date
  location?: { lat: number; lng: number }
  imagery?: string
}

interface ResultPanelProps {
  results: QueryResult[]
  isLoading: boolean
  onClose: () => void
}

export default function ResultPanel({ results, isLoading, onClose }: ResultPanelProps) {
  const [selectedResult, setSelectedResult] = useState<QueryResult | null>(null)
  const [favoriteResults, setFavoriteResults] = useState<Set<string>>(new Set())

  const toggleFavorite = (resultId: string) => {
    setFavoriteResults(prev => {
      const newSet = new Set(prev)
      if (newSet.has(resultId)) {
        newSet.delete(resultId)
      } else {
        newSet.add(resultId)
      }
      return newSet
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'analysis': return 'text-blue-400 bg-blue-500/20'
      case 'discovery': return 'text-green-400 bg-green-500/20'
      case 'monitoring': return 'text-purple-400 bg-purple-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'analysis': return TrendingUp
      case 'discovery': return Eye
      case 'monitoring': return Zap
      default: return TrendingUp
    }
  }

  return (
    <div className="h-full bg-space-900/95 backdrop-blur-xl border-l border-white/10 flex flex-col">
      {/* ヘッダー */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">分析結果</h2>
            <p className="text-sm text-gray-400">
              {results.length}件の結果 • {isLoading ? '分析中...' : '完了'}
            </p>
          </div>
          <motion.button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* フィルターボタン */}
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-sm">
            すべて
          </button>
          <button className="px-3 py-1 rounded-full hover:bg-white/10 text-gray-400 text-sm transition-colors">
            分析
          </button>
          <button className="px-3 py-1 rounded-full hover:bg-white/10 text-gray-400 text-sm transition-colors">
            発見
          </button>
          <button className="px-3 py-1 rounded-full hover:bg-white/10 text-gray-400 text-sm transition-colors">
            監視
          </button>
        </div>
      </div>

      {/* ローディング表示 */}
      {isLoading && (
        <motion.div
          className="p-6 flex items-center space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="spinner" />
          <div>
            <p className="text-sm font-medium">AI分析中...</p>
            <p className="text-xs text-gray-400">衛星データを処理しています</p>
          </div>
        </motion.div>
      )}

      {/* 結果リスト */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {results.map((result, index) => {
            const TypeIcon = getTypeIcon(result.type)
            const isFavorite = favoriteResults.has(result.id)
            
            return (
              <motion.div
                key={result.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedResult(result)}
              >
                <div className="p-4">
                  {/* ヘッダー行 */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(result.type)}`}>
                        <TypeIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white text-sm leading-5 line-clamp-2">
                          {result.query}
                        </h3>
                        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{result.timestamp.toLocaleTimeString('ja-JP', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}</span>
                          </div>
                          {result.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>
                                {result.location.lat.toFixed(2)}, {result.location.lng.toFixed(2)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>

                  {/* プレビュー */}
                  <div className="text-sm text-gray-300 mb-3 line-clamp-2">
                    {result.result}
                  </div>

                  {/* アクションボタン */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(result.id)
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isFavorite 
                            ? 'text-red-400 bg-red-500/20' 
                            : 'text-gray-400 hover:text-red-400 hover:bg-red-500/20'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
                      </motion.button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 transition-colors"
                      >
                        <Share2 className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-500/20 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                      {result.type === 'analysis' ? '分析' : 
                       result.type === 'discovery' ? '発見' : '監視'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* 空の状態 */}
        {!isLoading && results.length === 0 && (
          <motion.div
            className="p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">まだ分析結果がありません</h3>
            <p className="text-gray-400 text-sm">
              上部のコマンドパレットから地球について質問してみましょう
            </p>
          </motion.div>
        )}
      </div>

      {/* 詳細モーダル */}
      <AnimatePresence>
        {selectedResult && (
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedResult(null)}
          >
            <motion.div
              className="bg-space-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* モーダルヘッダー */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {selectedResult.query}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedResult.timestamp.toLocaleString('ja-JP')}</span>
                      </div>
                      {selectedResult.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {selectedResult.location.lat.toFixed(4)}, {selectedResult.location.lng.toFixed(4)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedResult(null)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* モーダルコンテンツ */}
              <div className="p-6 overflow-y-auto">
                {/* 結果テキスト */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">分析結果</h4>
                  <p className="text-white leading-relaxed">{selectedResult.result}</p>
                </div>

                {/* 模擬的な追加データ */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="text-xs font-semibold text-gray-400 mb-1">信頼度</h5>
                    <div className="text-2xl font-bold text-green-400">94%</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="text-xs font-semibold text-gray-400 mb-1">処理時間</h5>
                    <div className="text-2xl font-bold text-blue-400">2.3s</div>
                  </div>
                </div>

                {/* アクションボタン */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>詳細分析を実行</span>
                  </button>
                  <button className="px-4 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
