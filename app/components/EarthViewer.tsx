'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function EarthViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // キャンバスサイズを設定
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // アニメーションの状態
    let animationId: number
    let rotation = 0
    let time = 0

    // 地球のパラメータ
    const earthRadius = Math.min(canvas.width, canvas.height) * 0.3
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // 星を生成
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkle: Math.random() * Math.PI * 2
    }))

    // 地球の描画
    const drawEarth = () => {
      if (!ctx) return

      // 地球の基本球体
      const gradient = ctx.createRadialGradient(
        centerX - earthRadius * 0.3, 
        centerY - earthRadius * 0.3, 
        0,
        centerX, 
        centerY, 
        earthRadius
      )
      gradient.addColorStop(0, '#4f9eff')
      gradient.addColorStop(0.4, '#3b7ddd')
      gradient.addColorStop(0.8, '#1e40af')
      gradient.addColorStop(1, '#1e3a8a')

      ctx.beginPath()
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // 地球のハイライト
      const highlightGradient = ctx.createRadialGradient(
        centerX - earthRadius * 0.4,
        centerY - earthRadius * 0.4,
        0,
        centerX - earthRadius * 0.4,
        centerY - earthRadius * 0.4,
        earthRadius * 0.6
      )
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)')
      highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.beginPath()
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2)
      ctx.fillStyle = highlightGradient
      ctx.fill()

      // 大陸のシルエット（簡単な形）
      ctx.fillStyle = '#2d5a27'
      drawContinent(ctx, centerX, centerY, earthRadius, rotation)
    }

    // 大陸の描画（シンプルな形状）
    const drawContinent = (ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, rot: number) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(rot)

      // アジア大陸風の形状
      ctx.beginPath()
      ctx.ellipse(radius * 0.3, -radius * 0.2, radius * 0.4, radius * 0.3, 0, 0, Math.PI * 2)
      ctx.fill()

      // アメリカ大陸風の形状
      ctx.beginPath()
      ctx.ellipse(-radius * 0.4, radius * 0.1, radius * 0.2, radius * 0.5, 0, 0, Math.PI * 2)
      ctx.fill()

      // ヨーロッパ・アフリカ風の形状
      ctx.beginPath()
      ctx.ellipse(radius * 0.1, radius * 0.3, radius * 0.25, radius * 0.4, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    // 星の描画
    const drawStars = () => {
      if (!ctx) return

      stars.forEach(star => {
        const twinkleEffect = Math.sin(time * 0.01 + star.twinkle) * 0.3 + 0.7
        ctx.globalAlpha = star.opacity * twinkleEffect

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()

        // より明るい星にはグロー効果
        if (star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
          ctx.globalAlpha = star.opacity * twinkleEffect * 0.3
          ctx.fillStyle = '#87ceeb'
          ctx.fill()
        }
      })
      ctx.globalAlpha = 1
    }

    // グローバルイルミネーション効果
    const drawGlobalEffects = () => {
      if (!ctx) return

      // オーロラ効果
      const auroraGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      auroraGradient.addColorStop(0, 'rgba(59, 130, 246, 0.05)')
      auroraGradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.1)')
      auroraGradient.addColorStop(1, 'rgba(236, 72, 153, 0.05)')

      ctx.fillStyle = auroraGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // パーティクル効果
      const numParticles = 20
      for (let i = 0; i < numParticles; i++) {
        const x = (Math.sin(time * 0.001 + i) * canvas.width * 0.3) + canvas.width * 0.5
        const y = (Math.cos(time * 0.0015 + i) * canvas.height * 0.3) + canvas.height * 0.5
        const size = Math.sin(time * 0.002 + i) * 2 + 1

        ctx.globalAlpha = 0.3
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = '#3b82f6'
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    // アニメーションループ
    const animate = () => {
      if (!ctx) return

      // 背景をクリア
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 時間を更新
      time += 1
      rotation += 0.002

      // 描画順序
      drawStars()
      drawGlobalEffects()
      drawEarth()

      animationId = requestAnimationFrame(animate)
    }

    // 初回描画
    animate()
    setIsLoaded(true)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* メインキャンバス */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* ローディングオーバーレイ */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-space-900"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2 }}
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

      {/* 追加の視覚効果 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-space-900/50" />
        
        {/* エッジグロー */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-purple-500/5" />
      </div>

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
    </div>
  )
}
