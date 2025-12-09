import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '호원앤컴퍼니 인터뷰 사전 설문지',
  description: '호원앤컴퍼니 채용 인터뷰 사전 설문',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}