import { ReactNode } from 'react'
import Head from 'next/head'
import Logo from '@/components/logo'
import CustomLink from '@/components/link'

export const siteTitle = 'Next Beer'

type Props = {
  children?: ReactNode
  title?: string
  className?: string
  home?: boolean
}

export default function Layout({
  children,
  title,
  className,
  home = false,
}: Props) {
  let composedTitle: string = siteTitle
  if (title) {
    composedTitle = `${title} - ${composedTitle}`
  }

  let mainClassName = 'max-w-screen-xl mx-auto py-4'
  if (className) {
    mainClassName += ` ${className}`
  }

  return (
    <>
      <Head>
        <title>{composedTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="sticky grid-cols-[1fr_auto_1fr] items-center grid top-0 z-40 w-full backdrop-blur border-b border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75">
        <div className="relative col-start-2 px-5 mx-4">
          <span className="text-xl text-teal-400 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center z-10 whitespace-nowrap -skew-x-6">
            {siteTitle}
          </span>

          <Logo width={80} height={99} strokeWidth={10}></Logo>
        </div>

        {!home && (
          <CustomLink href="/" className="justify-self-start">
            Torna alla home
          </CustomLink>
        )}
      </header>

      <main className={mainClassName}>{children}</main>

      <footer className="text-center">
        Made with <span className="text-red-500">❤</span> by{' '}
        <CustomLink
          href="https://github.com/AbboDev/"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 transition-colors hover:text-teal-400"
        >
          AbboDev
        </CustomLink>
      </footer>
    </>
  )
}
