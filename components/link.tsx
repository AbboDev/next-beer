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

  const className = [...defaultClassName, props?.className].join(' ')

  return (
    <NextLink className={className} {...props}>
      {props.children}
    </NextLink>
  )
}
