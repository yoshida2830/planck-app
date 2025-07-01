import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Planck - 世界を、リアルタイムで更新する。',
  description: 'AIを通じて地理空間インテリジェンスを民主化し、誰でも自然言語で地球規模のインサイトを瞬時に得られるプラットフォーム',
  keywords: ['AI', '地理空間', '衛星データ', 'リモートセンシング', 'インテリジェンス'],
  authors: [{ name: 'Planck Inc.' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta property="og:title" content="Planck - 世界を、リアルタイムで更新する。" />
        <meta property="og:description" content="AIを通じて地理空間インテリジェンスを民主化し、誰でも自然言語で地球規模のインサイトを瞬時に得られるプラットフォーム" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-space-900 via-space-800 to-primary-900">
          {children}
        </div>
      </body>
    </html>
  )
}
