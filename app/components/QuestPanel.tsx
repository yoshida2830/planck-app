'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Zap, 
  Crown, 
  Target, 
  Clock, 
  Trophy,
  Star,
  ChevronRight,
  Gift,
  Flame,
  Users,
  Map,
  Eye,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'

interface UserProgress {
  level: number
  xp: number
  totalXp: number
  badges: string[]
  discoveries: number
}

interface Quest {
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
}

interface QuestPanelProps {
  userProgress: UserProgress
  onClose: () => void
  onQuestComplete: (xp: number) => void
}

export default function QuestPanel({ userProgress, onClose, onQuestComplete }: QuestPanelProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'leaderboard'>('active')
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)

  const quests: Quest[] = [
    {
      id: '1',
      title: '月面探索者',
      description: '人類が月に残した月面車を発見してください',
      category: 'special',
      difficulty: 'medium',
      xpReward: 150,
      progress: 1,
      maxProgress: 1,
      completed: true,
      icon: '🌙'
    },
    {
      id: '2',
      title: '今日の地球ウォッチャー',
      description: '今日中に3つの異なる大陸を分析してください',
      category: 'daily',
      difficulty: 'easy',
      xpReward: 50,
      progress: 2,
      maxProgress: 3,
      completed: false,
      timeLimit: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6時間後
      icon: '🌍'
    },
    {
      id: '3',
      title: 'クライメート・インベスティゲーター',
      description: '気候変動の影響を示す5つの場所を発見してください',
      category: 'weekly',
      difficulty: 'hard',
      xpReward: 300,
      progress: 1,
      maxProgress: 5,
      completed: false,
      timeLimit: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5日後
      icon: '🌡️'
    },
    {
      id: '4',
      title: '都市の変化を追え',
      description: '過去10年間で最も成長した都市を発見してください',
      category: 'special',
      difficulty: 'medium',
      xpReward: 200,
      progress: 0,
      maxProgress: 1,
      completed: false,
      icon: '🏙️'
    },
    {
      id: '5',
      title: '隠された宝物',
      description: '???',
      category: 'hidden',
      difficulty: 'legendary',
      xpReward: 500,
      progress: 0,
      maxProgress: 1,
      completed: false,
      icon: '💎'
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20'
      case 'hard': return 'text-red-400 bg-red-500/20'
      case 'legendary': return 'text-purple-400 bg-purple-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'daily': return Clock
      case 'weekly': return Target
      case 'special': return Star
      case 'hidden': return Eye
      default: return Zap
    }
  }

  const leaderboardData = [
    { rank: 1, name: 'スペースエクスプローラー', xp: 15420, avatar: '🚀' },
    { rank: 2, name: 'アースウォッチャー', xp: 12350, avatar: '🌍' },
    { rank: 3, name: 'サテライトハンター', xp: 9870, avatar: '🛰️' },
    { rank: 4, name: 'あなた', xp: userProgress.xp, avatar: '👤' },
    { rank: 5, name: 'クライメートガーディアン', xp: 7540, avatar: '🌿' },
  ]

  const handleQuestClick = (quest: Quest) => {
    if (!quest.completed && quest.category !== 'hidden') {
      setSelectedQuest(quest)
    }
  }

  const handleQuestAccept = (quest: Quest) => {
    // 模擬的なクエスト開始処理
    console.log(`Quest accepted: ${quest.title}`)
    setSelectedQuest(null)
  }

  return (
    <div className="h-full bg-space-900/95 backdrop-blur-xl border-l border-white/10 flex flex-col">
      {/* ヘッダー */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span>クエスト</span>
            </h2>
            <p className="text-sm text-gray-400">冒険を通じて地球の秘密を解き明かそう</p>
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

        {/* プログレス表示 */}
        <div className="bg-white/5 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">Level {userProgress.level}</span>
            </div>
            <span className="text-sm text-gray-400">
              {userProgress.xp} / {userProgress.totalXp} XP
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(userProgress.xp / userProgress.totalXp) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{userProgress.discoveries} 発見</span>
            <span>{userProgress.badges.length} バッジ</span>
          </div>
        </div>

        {/* タブナビゲーション */}
        <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
          {[
            { id: 'active', label: 'アクティブ', icon: Flame },
            { id: 'completed', label: '完了済み', icon: Trophy },
            { id: 'leaderboard', label: 'ランキング', icon: Users }
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* コンテンツエリア */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'active' && (
          <div className="p-4 space-y-4">
            {quests.filter(q => !q.completed).map((quest, index) => {
              const CategoryIcon = getCategoryIcon(quest.category)
              const progressPercentage = (quest.progress / quest.maxProgress) * 100
              
              return (
                <motion.div
                  key={quest.id}
                  className="quest-card rounded-xl p-4 cursor-pointer hover:border-blue-500/60"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleQuestClick(quest)}
                >
                  <div className="flex items-start space-x-4">
                    {/* アイコン */}
                    <div className="text-2xl">{quest.icon}</div>
                    
                    <div className="flex-1 min-w-0">
                      {/* ヘッダー */}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-white text-sm leading-5">
                            {quest.category === 'hidden' ? '????' : quest.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(quest.difficulty)}`}>
                              {quest.difficulty}
                            </span>
                            <div className="flex items-center space-x-1 text-xs text-gray-400">
                              <CategoryIcon className="w-3 h-3" />
                              <span>
                                {quest.category === 'daily' ? 'デイリー' :
                                 quest.category === 'weekly' ? 'ウィークリー' :
                                 quest.category === 'special' ? 'スペシャル' : '隠し'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-sm font-semibold">{quest.xpReward}</span>
                        </div>
                      </div>

                      {/* 説明文 */}
                      <p className="text-sm text-gray-300 mb-3">
                        {quest.category === 'hidden' ? '神秘的なクエストが隠されています...' : quest.description}
                      </p>

                      {/* プログレス */}
                      {quest.category !== 'hidden' && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>進捗</span>
                            <span>{quest.progress} / {quest.maxProgress}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <motion.div
                              className="bg-gradient-to-r from-primary-500 to-purple-500 h-1.5 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${progressPercentage}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      )}

                      {/* タイムリミット */}
                      {quest.timeLimit && (
                        <div className="flex items-center space-x-1 text-xs text-orange-400">
                          <Clock className="w-3 h-3" />
                          <span>
                            残り {Math.ceil((quest.timeLimit.getTime() - Date.now()) / (1000 * 60 * 60))} 時間
                          </span>
                        </div>
                      )}
                    </div>

                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="p-4 space-y-4">
            {quests.filter(q => q.completed).map((quest, index) => (
              <motion.div
                key={quest.id}
                className="bg-green-500/10 border border-green-500/30 rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{quest.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm mb-1">{quest.title}</h3>
                    <p className="text-xs text-gray-300 mb-2">{quest.description}</p>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-yellow-400 font-medium">+{quest.xpReward} XP</span>
                    </div>
                  </div>
                  <div className="text-green-400">
                    <Trophy className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="p-4 space-y-3">
            {leaderboardData.map((player, index) => (
              <motion.div
                key={player.rank}
                className={`flex items-center space-x-4 p-3 rounded-xl ${
                  player.name === 'あなた' 
                    ? 'bg-primary-500/20 border border-primary-500/30' 
                    : 'bg-white/5'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  player.rank === 1 ? 'bg-yellow-500 text-black' :
                  player.rank === 2 ? 'bg-gray-400 text-black' :
                  player.rank === 3 ? 'bg-orange-600 text-white' :
                  'bg-gray-600 text-white'
                }`}>
                  {player.rank}
                </div>
                <div className="text-2xl">{player.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm">{player.name}</h3>
                  <p className="text-xs text-gray-400">{player.xp.toLocaleString()} XP</p>
                </div>
                {player.rank <= 3 && (
                  <Trophy className={`w-5 h-5 ${
                    player.rank === 1 ? 'text-yellow-400' :
                    player.rank === 2 ? 'text-gray-400' :
                    'text-orange-600'
                  }`} />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* クエスト詳細モーダル */}
      <AnimatePresence>
        {selectedQuest && (
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedQuest(null)}
          >
            <motion.div
              className="bg-space-800 rounded-2xl max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{selectedQuest.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{selectedQuest.title}</h3>
                  <p className="text-gray-300">{selectedQuest.description}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">難易度</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedQuest.difficulty)}`}>
                      {selectedQuest.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">報酬</span>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-semibold">{selectedQuest.xpReward} XP</span>
                    </div>
                  </div>
                  {selectedQuest.timeLimit && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">制限時間</span>
                      <span className="text-orange-400">
                        残り {Math.ceil((selectedQuest.timeLimit.getTime() - Date.now()) / (1000 * 60 * 60))} 時間
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedQuest(null)}
                    className="flex-1 py-3 px-4 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={() => handleQuestAccept(selectedQuest)}
                    className="flex-1 py-3 px-4 bg-primary-500 hover:bg-primary-600 rounded-lg text-white font-medium transition-colors"
                  >
                    開始する
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
