import { ReactNode } from 'react'
import Head from 'next/head'

export const siteTitle = 'Next Beer'

type Props = {
  children?: ReactNode
  title?: string
}

export default function Layout({ children, title }: Props) {
  let composedTitle: string = siteTitle
  if (title) {
    composedTitle = `${title} - ${composedTitle}`
  }

  return (
    <>
      <Head>
        <title>{composedTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </>
  )
}
