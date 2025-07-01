'use client'

import { motion } from 'framer-motion'
import { Globe, Bell, Settings, User, Crown } from 'lucide-react'
import { useState } from 'react'

interface UserProgress {
  level: number
  xp: number
  totalXp: number
  badges: string[]
  discoveries: number
}

interface HeaderProps {
  userProgress: UserProgress
}

export default function Header({ userProgress }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const progressPercentage = (userProgress.xp / userProgress.totalXp) * 100

  const badges = {
    'luna-explorer': { name: 'ルナティック・エクスプローラー', icon: '🌙', rarity: 'rare' },
    'first-discovery': { name: '最初の発見者', icon: '🔍', rarity: 'common' },
    'climate-watcher': { name: 'クライメート・ウォッチャー', icon: '🌍', rarity: 'epic' },
  }

  return (
    <motion.header 
      className="flex items-center justify-between p-4 glass-dark border-b border-white/10 relative z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* ロゴエリア */}
      <div className="flex items-center space-x-4">
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <div className="relative">
            <Globe className="w-8 h-8 text-primary-400" />
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-primary-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">Planck</h1>
            <p className="text-xs text-gray-400">Beta v0.1.0</p>
          </div>
        </motion.div>
      </div>

      {/* 中央のプログレスエリア */}
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="flex items-center space-x-4">
          {/* レベル表示 */}
          <div className="flex items-center space-x-2">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold">Lv.{userProgress.level}</span>
          </div>
          
          {/* XPプログレスバー */}
          <div className="flex-1 relative">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1 flex justify-between">
              <span>{userProgress.xp} XP</span>
              <span>{userProgress.totalXp} XP</span>
            </div>
          </div>

          {/* 発見数 */}
          <div className="text-sm text-gray-300">
            <span className="text-primary-400 font-semibold">{userProgress.discoveries}</span> 発見
          </div>
        </div>
      </div>

      {/* 右側のアクションエリア */}
      <div className="flex items-center space-x-2">
        {/* バッジ表示 */}
        <div className="hidden sm:flex items-center space-x-1">
          {userProgress.badges.slice(0, 3).map((badgeKey) => {
            const badge = badges[badgeKey as keyof typeof badges]
            return badge ? (
              <motion.div
                key={badgeKey}
                className={`
                  px-2 py-1 rounded-full text-xs flex items-center space-x-1 badge
                  ${badge.rarity === 'epic' ? 'from-purple-500 to-pink-500' : 
                    badge.rarity === 'rare' ? 'from-blue-500 to-purple-500' : 
                    'from-gray-500 to-gray-600'}
                `}
                whileHover={{ scale: 1.05 }}
                title={badge.name}
              >
                <span>{badge.icon}</span>
                <span className="hidden lg:inline">{badge.name}</span>
              </motion.div>
            ) : null
          })}
        </div>

        {/* 通知ボタン */}
        <div className="relative">
          <motion.button
            className="p-2 rounded-lg hover:bg-white/10 transition-colors relative"
            onClick={() => setShowNotifications(!showNotifications)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5" />
            <motion.div 
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.button>

          {/* 通知ドロップダウン */}
          {showNotifications && (
            <motion.div
              className="absolute right-0 top-full mt-2 w-80 glass-dark rounded-lg border border-white/20 p-4 z-60"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h3 className="font-semibold mb-3">通知</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-3 p-2 rounded hover:bg-white/5">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">新しいクエストが利用可能です</p>
                    <p className="text-xs text-gray-400">2分前</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-2 rounded hover:bg-white/5">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">バッジ「クライメート・ウォッチャー」を獲得しました！</p>
                    <p className="text-xs text-gray-400">1時間前</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* 設定ボタン */}
        <motion.button
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-5 h-5" />
        </motion.button>

        {/* プロフィールボタン */}
        <div className="relative">
          <motion.button
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setShowProfile(!showProfile)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-5 h-5" />
          </motion.button>

          {/* プロフィールドロップダウン */}
          {showProfile && (
            <motion.div
              className="absolute right-0 top-full mt-2 w-64 glass-dark rounded-lg border border-white/20 p-4 z-60"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">エクスプローラー</h3>
                  <p className="text-sm text-gray-400">Level {userProgress.level}</p>
                </div>
              </div>
              
              <div className="space-y-2 border-t border-white/10 pt-3">
                <button className="w-full text-left p-2 rounded hover:bg-white/5 text-sm">
                  プロフィール設定
                </button>
                <button className="w-full text-left p-2 rounded hover:bg-white/5 text-sm">
                  統計情報
                </button>
                <button className="w-full text-left p-2 rounded hover:bg-white/5 text-sm">
                  Discordに参加
                </button>
                <button className="w-full text-left p-2 rounded hover:bg-white/5 text-sm text-red-400">
                  ログアウト
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  )
}
