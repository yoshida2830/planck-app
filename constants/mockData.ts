// Mock data for Planck App development and demonstration

import { Quest, Badge, QueryResult, Insight } from '../types/global'

export const SAMPLE_QUERIES = [
  '東京湾の埋め立て地の変化を過去5年間で見せて',
  'アマゾンの森林減少が最も激しい地域はどこ？',
  'スエズ運河の通行状況を教えて',
  '北極の氷河の融解速度を分析して',
  '世界の主要都市の夜間光度を比較して',
  '台風の進路予測と影響範囲を表示して',
  'カリフォルニアの山火事の被害範囲は？',
  '中国の新疆ウイグル地区の都市開発状況',
  'サハラ砂漠の緑化プロジェクトの進捗',
  '地中海の海水温度変化を10年間で追跡',
]

export const SAMPLE_RESULTS: QueryResult[] = [
  {
    id: '1',
    query: '東京湾の埋め立て地の変化を過去5年間で見せて',
    result: '東京湾では2019年から2024年にかけて、羽田空港周辺と臨海副都心エリアで大規模な埋め立て工事が確認されました。特に羽田空港の滑走路拡張により約120ヘクタールの新たな陸地が造成されています。',
    type: 'analysis',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    location: { lat: 35.6762, lng: 139.6503 },
    confidence: 94,
    processingTime: 2.3
  },
  {
    id: '2',
    query: 'アマゾンの森林減少が最も激しい地域はどこ？',
    result: 'ブラジルのパラ州南部とマットグロッソ州北部の境界付近で最も深刻な森林減少が観測されています。2024年の減少率は前年比15%増加しており、主に大豆栽培地の拡大が原因とみられます。',
    type: 'discovery',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    location: { lat: -8.7832, lng: -55.4915 },
    confidence: 89,
    processingTime: 4.7
  },
  {
    id: '3',
    query: 'スエズ運河の通行状況を教えて',
    result: '現在、スエズ運河では通常通りの船舶通行が確認されています。本日の通過予定は北行き32隻、南行き28隻で、平均待機時間は約6時間です。エバーギブン座礁事故以降、航路の幅が拡張され安全性が向上しています。',
    type: 'monitoring',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    location: { lat: 30.0444, lng: 31.2357 },
    confidence: 97,
    processingTime: 1.8
  }
]

export const SAMPLE_QUESTS: Quest[] = [
  {
    id: 'daily_1',
    title: '今日の地球ウォッチャー',
    description: '今日中に3つの異なる大陸を分析してください',
    category: 'daily',
    difficulty: 'easy',
    xpReward: 50,
    progress: 2,
    maxProgress: 3,
    completed: false,
    timeLimit: new Date(Date.now() + 6 * 60 * 60 * 1000),
    icon: '🌍',
    requirements: ['アジア', 'ヨーロッパ', 'アフリカ', 'アメリカ', 'オセアニア']
  },
  {
    id: 'weekly_1',
    title: 'クライメート・インベスティゲーター',
    description: '気候変動の影響を示す5つの場所を発見してください',
    category: 'weekly',
    difficulty: 'hard',
    xpReward: 300,
    progress: 1,
    maxProgress: 5,
    completed: false,
    timeLimit: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    icon: '🌡️',
    requirements: ['氷河後退', '海水面上昇', '砂漠化', '森林減少', '珊瑚白化']
  },
  {
    id: 'special_1',
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
    id: 'special_2',
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
    id: 'hidden_1',
    title: '隠された宝物',
    description: '???',
    category: 'hidden',
    difficulty: 'legendary',
    xpReward: 500,
    progress: 0,
    maxProgress: 1,
    completed: false,
    icon: '💎'
  }
]

export const SAMPLE_BADGES: Badge[] = [
  {
    id: 'luna_explorer',
    name: 'ルナティック・エクスプローラー',
    description: '月面の人工物を発見した',
    icon: '🌙',
    rarity: 'rare',
    unlockedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: 'first_discovery',
    name: '最初の発見者',
    description: '初回クエリを完了した',
    icon: '🔍',
    rarity: 'common',
    unlockedAt: new Date(Date.now() - 48 * 60 * 60 * 1000)
  },
  {
    id: 'climate_watcher',
    name: 'クライメート・ウォッチャー',
    description: '気候変動関連の分析を10回実行した',
    icon: '🌍',
    rarity: 'epic'
  },
  {
    id: 'urban_planner',
    name: 'アーバン・プランナー',
    description: '都市開発の変化を追跡した',
    icon: '🏗️',
    rarity: 'rare'
  },
  {
    id: 'ocean_guardian',
    name: 'オーシャン・ガーディアン',
    description: '海洋環境の保護に貢献した',
    icon: '🌊',
    rarity: 'epic'
  }
]

export const SAMPLE_INSIGHTS: Insight[] = [
  {
    id: '1',
    title: '南米リチウム探査レポート',
    description: 'アルゼンチン・ボリビア・チリのリチウム三角地帯における最新の開発状況と環境影響分析',
    category: 'Mining & Resources',
    price: 15000,
    creator: 'ResourceAnalyst_Pro',
    rating: 4.8,
    downloads: 234,
    tags: ['リチウム', '南米', '鉱物資源', 'EV', 'サプライチェーン'],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    title: 'アジア都市化トレンド2024',
    description: 'インド、インドネシア、ベトナムの急成長都市における開発パターンと人口増加の相関分析',
    category: 'Urban Development',
    price: 8500,
    creator: 'UrbanWatcher_Tokyo',
    rating: 4.6,
    downloads: 156,
    tags: ['都市化', 'アジア', '人口動態', 'インフラ'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    title: '北極海氷変化マップ',
    description: '2020-2024年の北極海氷面積変化と船舶航路への影響分析。北極海航路の商業利用可能性を評価',
    category: 'Climate & Environment',
    price: 12000,
    creator: 'ClimateScientist_Norway',
    rating: 4.9,
    downloads: 89,
    tags: ['北極', '海氷', '気候変動', '航路', '環境'],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
  }
]

export const TRENDING_QUERIES = [
  'ウクライナ情勢の衛星画像分析',
  '中国の新疆ウイグル地区の変化',
  'カリフォルニア山火事の被害状況',
  'インドの大気汚染レベル',
  '台湾海峡の軍事活動',
  'サウジアラビアのNEOM建設進捗',
  'ブラジル大統領選後の森林保護',
  '北朝鮮の核施設活動',
  'エチオピアのダム建設問題',
  'オーストラリアの洪水被害'
]

export const RECENT_DISCOVERIES = [
  {
    title: '謎の円形構造物を発見',
    location: 'モンゴル・ゴビ砂漠',
    discoverer: 'DesertExplorer_MN',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    title: '新たな地熱活動を確認',
    location: 'アイスランド・レイキャビク近郊',
    discoverer: 'GeothermalWatcher',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    title: '未知の古代都市遺跡',
    location: 'ペルー・アマゾン流域',
    discoverer: 'ArcheoSat_Peru',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000)
  }
]

export const LEADERBOARD_DATA = [
  { rank: 1, name: 'スペースエクスプローラー', xp: 15420, avatar: '🚀', country: 'JP' },
  { rank: 2, name: 'アースウォッチャー', xp: 12350, avatar: '🌍', country: 'US' },
  { rank: 3, name: 'サテライトハンター', xp: 9870, avatar: '🛰️', country: 'DE' },
  { rank: 4, name: 'クライメートガーディアン', xp: 8540, avatar: '🌿', country: 'CA' },
  { rank: 5, name: 'オーシャンナビゲーター', xp: 7230, avatar: '🌊', country: 'AU' },
  { rank: 6, name: 'フォレストディテクティブ', xp: 6890, avatar: '🌲', country: 'BR' },
  { rank: 7, name: 'アークティックレンジャー', xp: 6420, avatar: '🐻‍❄️', country: 'NO' },
  { rank: 8, name: 'デザートスカウト', xp: 5980, avatar: '🐪', country: 'EG' },
  { rank: 9, name: 'マウンテンクライマー', xp: 5670, avatar: '🏔️', country: 'NP' },
  { rank: 10, name: 'コーラルガーディアン', xp: 5340, avatar: '🐠', country: 'MV' }
]

export const CATEGORY_ICONS = {
  'Mining & Resources': '⛏️',
  'Urban Development': '🏙️',
  'Climate & Environment': '🌍',
  'Agriculture': '🌾',
  'Ocean & Marine': '🌊',
  'Defense & Security': '🛡️',
  'Transportation': '🚢',
  'Energy': '⚡',
  'Forestry': '🌲',
  'Disaster Response': '🚨'
}

export const DIFFICULTY_COLORS = {
  easy: 'text-green-400 bg-green-500/20',
  medium: 'text-yellow-400 bg-yellow-500/20',
  hard: 'text-red-400 bg-red-500/20',
  legendary: 'text-purple-400 bg-purple-500/20'
}

export const RARITY_COLORS = {
  common: 'from-gray-500 to-gray-600',
  rare: 'from-blue-500 to-purple-500',
  epic: 'from-purple-500 to-pink-500',
  legendary: 'from-yellow-400 to-orange-500'
}
