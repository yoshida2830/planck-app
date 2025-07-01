'use client'

import { motion } from 'framer-motion'
import { 
  Search, 
  Zap, 
  Globe, 
  TrendingUp, 
  Users, 
  Settings, 
  BookOpen,
  Heart,
  Share2,
  Download
} from 'lucide-react'

interface SidebarProps {
  activePanel: 'results' | 'quests' | null
  onPanelChange: (panel: 'results' | 'quests' | null) => void
}

export default function Sidebar({ activePanel, onPanelChange }: SidebarProps) {
  const menuItems = [
    { 
      id: 'results', 
      icon: Search, 
      label: '分析結果', 
      description: '過去のクエリと発見',
      color: 'text-blue-400',
      activeColor: 'bg-blue-500/20'
    },
    { 
      id: 'quests', 
      icon: Zap, 
      label: 'クエスト', 
      description: 'ミッションと達成状況',
      color: 'text-yellow-400',
      activeColor: 'bg-yellow-500/20'
    },
    { 
      id: 'globe', 
      icon: Globe, 
      label: '地球ビュー', 
      description: 'インタラクティブ地球',
      color: 'text-green-400',
      activeColor: 'bg-green-500/20'
    },
    { 
      id: 'trends', 
      icon: TrendingUp, 
      label: 'トレンド', 
      description: '人気のクエリと発見',
      color: 'text-purple-400',
      activeColor: 'bg-purple-500/20'
    },
    { 
      id: 'community', 
      icon: Users, 
      label: 'コミュニティ', 
      description: 'Discord & フォーラム',
      color: 'text-pink-400',
      activeColor: 'bg-pink-500/20'
    },
  ]

  const secondaryItems = [
    { icon: BookOpen, label: 'ドキュメント', color: 'text-gray-400' },
    { icon: Heart, label: 'お気に入り', color: 'text-red-400' },
    { icon: Share2, label: '共有', color: 'text-blue-400' },
    { icon: Download, label: 'エクスポート', color: 'text-green-400' },
    { icon: Settings, label: '設定', color: 'text-gray-400' },
  ]

  const handleItemClick = (itemId: string) => {
    if (itemId === 'results' || itemId === 'quests') {
      onPanelChange(activePanel === itemId ? null : itemId as 'results' | 'quests')
    } else {
      // その他のアイテムの処理（今回は模擬）
      console.log(`Clicked: ${itemId}`)
    }
  }

  return (
    <motion.aside
      className="hidden md:flex w-16 bg-space-900/50 backdrop-blur-lg border-r border-white/10 flex-col py-4 z-30"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* メインナビゲーション */}
      <nav className="flex-1 space-y-2 px-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activePanel === item.id
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.button
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group relative
                  ${isActive 
                    ? `${item.activeColor} ${item.color}` 
                    : 'hover:bg-white/10 text-gray-400 hover:text-white'
                  }
                `}
                onClick={() => handleItemClick(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                
                {/* ツールチップ */}
                <motion.div
                  className="absolute left-full ml-3 px-3 py-2 bg-gray-900 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50"
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                >
                  <div className="font-semibold">{item.label}</div>
                  <div className="text-xs text-gray-400">{item.description}</div>
                  
                  {/* 矢印 */}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                </motion.div>

                {/* アクティブインジケーター */}
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary-400 rounded-r"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            </motion.div>
          )
        })}
      </nav>

      {/* 区切り線 */}
      <div className="w-8 h-px bg-white/10 mx-auto my-4" />

      {/* セカンダリナビゲーション */}
      <div className="space-y-2 px-2">
        {secondaryItems.map((item, index) => {
          const Icon = item.icon
          
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (menuItems.length + index) * 0.1 }}
            >
              <motion.button
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group relative hover:bg-white/10 text-gray-500 hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                
                {/* ツールチップ */}
                <div className="absolute left-full ml-3 px-3 py-1 bg-gray-900 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                  {item.label}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                </div>
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      {/* ボトムのロゴエリア */}
      <motion.div
        className="px-2 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
          <Globe className="w-6 h-6 text-white" />
        </div>
      </motion.div>

      {/* ステータスインジケーター */}
      <motion.div
        className="absolute bottom-4 right-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
      >
        <div className="relative">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <motion.div
            className="absolute inset-0 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </motion.aside>
  )
}
