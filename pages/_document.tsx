import { useColorSchemeContext } from '@/context/color_scheme'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const { dark } = useColorSchemeContext()

  return (
    <Html lang="en" className={dark ? 'dark' : 'light'}>
      <Head />

      <body className="antialiased transition-colors text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
