'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function EarthViewer() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // 簡単なローディング遅延
    const timer = setTimeout(() => setIsLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-800/20" />
      
      {/* 星のエフェクト（CSS実装） */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* 中央の地球（シンプル版） */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 shadow-2xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {/* 地球のハイライト */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent" />
          
          {/* 大陸のシルエット（CSS実装） */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute top-1/4 left-1/3 w-16 h-12 bg-green-700/80 rounded-full transform rotate-12" />
            <div className="absolute top-1/2 right-1/4 w-12 h-8 bg-green-700/80 rounded-full transform -rotate-45" />
            <div className="absolute bottom-1/3 left-1/4 w-8 h-16 bg-green-700/80 rounded-full transform rotate-45" />
          </div>
          
          {/* 回転アニメーション */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-300/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* ローディング表示 */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-space-900/80"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="text-center">
            <motion.div
              className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p className="text-gray-400">地球を初期化中...</p>
          </div>
        </motion.div>
      )}

      {/* 統計情報 */}
      <motion.div
        className="absolute top-8 left-8 space-y-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="glass-dark rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">監視中の衛星</div>
          <div className="text-lg font-bold text-primary-300">2,847</div>
        </div>
        <div className="glass-dark rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">今日の解析クエリ</div>
          <div className="text-lg font-bold text-green-300">156,023</div>
        </div>
        <div className="glass-dark rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">発見されたインサイト</div>
          <div className="text-lg font-bold text-purple-300">4,892</div>
        </div>
      </motion.div>

      {/* インタラクションヒント */}
      <motion.div
        className="absolute bottom-8 left-8 glass-dark rounded-lg p-4 max-w-xs"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <h3 className="font-semibold mb-2 text-primary-300">🌍 リアルタイム地球監視</h3>
        <p className="text-sm text-gray-400">
          AIが24時間365日、地球の変化を監視し続けています。任意の場所について質問してみましょう。
        </p>
      </motion.div>
    </div>
  )
}
