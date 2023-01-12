import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Barlow as Inter } from '@next/font/google'

const inter = Inter({
  weight: '500',
  variable: '--barlow-font',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  )
}
