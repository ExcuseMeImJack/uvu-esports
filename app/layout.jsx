import { getServerSession } from 'next-auth'
import './globals.css'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Providers } from './providers'
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

export default async function RootLayout({
  children,
}) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <html lang="en">
      <body className={"inter.variable"}>
        <Providers children={children}>

        </Providers>
      </body>
    </html>
  )
}
