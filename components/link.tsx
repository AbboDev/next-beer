import NextLink, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

type Props = LinkProps & {
  rel?: string
  target?: string
  className?: string
  children?: ReactNode
}

export default function Link(props: Props) {
  const defaultClassName: string[] = [
    'underline',
    'underline-offset-4',
    'transition-colors',
    'hover:text-teal-400',
  ]

  const { className, children } = props

  const filteredProps: Props = { ...props }
  delete filteredProps.children
  delete filteredProps.className

  const linkClassName = [...defaultClassName, className].join(' ')

  return (
    <NextLink className={linkClassName} {...filteredProps}>
      {children}
    </NextLink>
  )
}
