import './globals.css'
// import { Inter } from 'next/font/google'

export const metadata = {
  metadataBase: new URL('https://postgres-prisma.vercel.app'),
  title: 'Utah Valley Esports',
  description:
    'The official site for Utah Valley Esports!',
}

// const inter = Inter({
//   variable: '--font-inter',
//   subsets: ['latin'],
//   display: 'swap',
// })

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={"inter.variable"}>

        {children}

      </body>
    </html>
  )
}
