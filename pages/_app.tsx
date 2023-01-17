import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Barlow as Inter } from '@next/font/google'
import { ColorScheme } from '@/context/color_scheme'

const inter = Inter({
  weight: '500',
  variable: '--barlow-font',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorScheme>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </ColorScheme>
  )
}
