# Planck - 世界を、リアルタイムで更新する。

🌍 AIを通じて地理空間インテリジェンスを民主化し、誰でも自然言語で地球規模のインサイトを瞬時に得られるプラットフォーム

## 🚀 概要

Planckは、従来の専門知識を必要とする衛星データ分析を、対話型の直感的な体験に変革するAIネイティブ・プラットフォームです。

### ✨ 主な機能

- **自然言語クエリ**: 専門知識不要で地球について質問
- **AI分析エンジン**: 司令塔AIによる高度な自動分析
- **インタラクティブ可視化**: 美しい3D地球ビューワー
- **ゲーミフィケーション**: 発見の楽しさを体験
- **コミュニティ**: 知識を共有し合うエコシステム

## 🛠️ 技術スタック

- **フロントエンド**: Next.js 14, React 18, TypeScript
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **3D可視化**: Three.js, Canvas API
- **アイコン**: Lucide React
- **デプロイ**: Vercel

## 🏗️ セットアップ

### 前提条件

- Node.js 18.0.0 以上
- npm または yarn

### インストール

1. リポジトリをクローン
```bash
git clone https://github.com/your-username/planck-app.git
cd planck-app
```

2. 依存関係をインストール
```bash
npm install
# または
yarn install
```

3. 開発サーバーを起動
```bash
npm run dev
# または
yarn dev
```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 🚀 Vercelへのデプロイ

### 方法1: Vercel CLIを使用

1. Vercel CLIをインストール
```bash
npm i -g vercel
```

2. プロジェクトをデプロイ
```bash
vercel
```

### 方法2: GitHubとの連携

1. GitHubにリポジトリをプッシュ
2. [Vercel Dashboard](https://vercel.com/dashboard)にアクセス
3. "New Project"をクリック
4. GitHubリポジトリを選択
5. 設定はデフォルトのままデプロイ

## 📁 プロジェクト構造

```
planck-app/
├── app/
│   ├── components/          # UIコンポーネント
│   │   ├── Header.tsx      # ヘッダーコンポーネント
│   │   ├── CommandPalette.tsx # コマンドパレット
│   │   ├── EarthViewer.tsx # 地球ビューワー
│   │   ├── Sidebar.tsx     # サイドバー
│   │   ├── ResultPanel.tsx # 結果表示パネル
│   │   └── QuestPanel.tsx  # クエストパネル
│   ├── globals.css         # グローバルスタイル
│   ├── layout.tsx          # ルートレイアウト
│   └── page.tsx           # ホームページ
├── public/                 # 静的ファイル
├── package.json           # 依存関係
├── tailwind.config.js     # Tailwind設定
├── tsconfig.json          # TypeScript設定
└── next.config.js         # Next.js設定
```

## 🎮 使用方法

### 基本的な使い方

1. **クエリの実行**: 画面中央のコマンドパレットに自然言語で質問を入力
2. **結果の確認**: 右パネルで分析結果を確認
3. **クエストの参加**: ゲーミフィケーション要素でレベルアップ
4. **発見の共有**: コミュニティで知見を共有

### サンプルクエリ

- "東京湾の埋め立て地の変化を過去5年間で見せて"
- "アマゾンの森林減少が最も激しい地域はどこ？"
- "スエズ運河の通行状況を教えて"
- "北極の氷河の融解速度を分析して"

## 🏆 ゲーミフィケーション

- **XPシステム**: クエリ実行で経験値獲得
- **レベルアップ**: 継続的な成長システム
- **バッジ**: 特別な発見に対する称号
- **クエスト**: デイリー/ウィークリーミッション
- **リーダーボード**: コミュニティランキング

## 🛡️ セキュリティ

- CSP (Content Security Policy) 実装
- XSS対策
- CSRF対策
- 入力値サニタイゼーション

## 📊 パフォーマンス最適化

- Server-side Rendering (SSR)
- Static Site Generation (SSG)
- Code Splitting
- Image Optimization
- Bundle Size Optimization

## 🔧 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm run start

# リンター実行
npm run lint
```

## 🤝 コントリビューション

1. フォークしてブランチを作成
2. 変更を実装
3. テストを実行
4. プルリクエストを作成

## 📝 ライセンス

MIT License

## 🙋‍♂️ サポート

質問やバグ報告は [Issues](https://github.com/your-username/planck-app/issues) へお願いします。

## 🔗 リンク

- [Live Demo](https://planck-app.vercel.app)
- [Design System](https://planck-design.vercel.app)
- [API Documentation](https://docs.planck.com)
- [Discord Community](https://discord.gg/planck)

---

Made with ❤️ by Planck Team
