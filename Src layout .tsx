import './globals.css'

export const metadata = {
  title: 'BetIQ — Copilote de paris sportifs',
  description: "L'assistant intelligent qui vous aide à analyser, simuler et améliorer vos paris sportifs.",
  manifest: '/manifest.json',
  themeColor: '#0F172A',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BetIQ" />
      </head>
      <body>{children}</body>
    </html>
  )
}
