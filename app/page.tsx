'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import CommandPalette from './components/CommandPalette'
import EarthViewer from './components/EarthViewer'
import Sidebar from './components/Sidebar'
import ResultPanel from './components/ResultPanel'
import QuestPanel from './components/QuestPanel'
import { Search, Globe, Zap, Users } from 'lucide-react'

interface QueryResult {
  id: string
  query: string
  result: string
  type: 'analysis' | 'discovery' | 'monitoring'
  timestamp: Date
  location?: { lat: number; lng: number }
  imagery?: string
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuery, setCurrentQuery] = useState('')
  const [results, setResults] = useState<QueryResult[]>([])
  const [activePanel, setActivePanel] = useState<'results' | 'quests' | null>('quests')
  const [userProgress, setUserProgress] = useState({
    level: 1,
    xp: 150,
    totalXp: 500,
    badges: ['luna-explorer', 'first-discovery'],
    discoveries: 12
  })

  // 模擬クエリ処理
  const handleQuery = async (query: string) => {
    setIsLoading(true)
    setCurrentQuery(query)
    setActivePanel('results')

    // 模擬的な処理時間
    await new Promise(resolve => setTimeout(resolve, 2000))

    const mockResults: QueryResult[] = [
      {
        id: Date.now().toString(),
        query,
        result: `「${query}」に関する分析を完了しました。衛星データから興味深いパターンを発見しました。`,
        type: 'analysis',
        timestamp: new Date(),
        location: { lat: 35.6762, lng: 139.6503 },
        imagery: '/api/placeholder/400/300'
      }
    ]

    setResults(prev => [...mockResults, ...prev])
    setIsLoading(false)
    
    // XP獲得のシミュレーション
    setUserProgress(prev => ({
      ...prev,
      xp: Math.min(prev.xp + 25, prev.totalXp),
      discoveries: prev.discoveries + 1
    }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header userProgress={userProgress} />
      
      <main className="flex-1 flex relative overflow-hidden">
        {/* メインコンテンツエリア */}
        <div className="flex-1 relative">
          {/* 中央のコマンドパレット */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="pointer-events-auto">
              <CommandPalette 
                onQuery={handleQuery} 
                isLoading={isLoading}
                currentQuery={currentQuery}
              />
            </div>
          </div>

          {/* 背景の地球ビューワー */}
          <div className="absolute inset-0 z-0">
            <EarthViewer />
          </div>

          {/* フローティングナビゲーション */}
          <div className="absolute top-4 right-4 z-30">
            <motion.div 
              className="flex flex-col space-y-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => setActivePanel(activePanel === 'results' ? null : 'results')}
                className={`p-3 rounded-full glass transition-all duration-300 ${
                  activePanel === 'results' ? 'bg-primary-500/30' : 'hover:bg-white/10'
                }`}
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActivePanel(activePanel === 'quests' ? null : 'quests')}
                className={`p-3 rounded-full glass transition-all duration-300 ${
                  activePanel === 'quests' ? 'bg-primary-500/30' : 'hover:bg-white/10'
                }`}
              >
                <Zap className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* サイドバー */}
        <Sidebar activePanel={activePanel} onPanelChange={setActivePanel} />

        {/* パネル */}
        <AnimatePresence>
          {activePanel && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="absolute right-0 top-0 h-full w-96 z-40"
            >
              {activePanel === 'results' && (
                <ResultPanel 
                  results={results} 
                  isLoading={isLoading}
                  onClose={() => setActivePanel(null)}
                />
              )}
              {activePanel === 'quests' && (
                <QuestPanel 
                  userProgress={userProgress}
                  onClose={() => setActivePanel(null)}
                  onQuestComplete={(xp) => {
                    setUserProgress(prev => ({
                      ...prev,
                      xp: Math.min(prev.xp + xp, prev.totalXp)
                    }))
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ボトムナビゲーション（モバイル対応） */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <motion.div 
          className="flex justify-center space-x-4 glass-dark rounded-full p-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button className="p-3 rounded-full bg-primary-500/20 hover:bg-primary-500/30 transition-colors">
            <Globe className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full hover:bg-white/10 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full hover:bg-white/10 transition-colors">
            <Zap className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full hover:bg-white/10 transition-colors">
            <Users className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}
