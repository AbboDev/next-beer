import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const bodyClassName = `antialiased text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900`
  return (
    <Html lang="en">
      <Head />

      <body className={bodyClassName}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
