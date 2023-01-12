import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  className?: string
}

export default function H1({ children, className }: Props) {
  const defaultClassName: string[] = [
    'inline-block',
    'text-3xl',
    'mb-6',
    'w-full',
    'sm:text-6xl',
    'font-extrabold',
    'text-slate-900',
    'tracking-tight',
    'dark:text-slate-200',
  ]

  const h1ClassName: string = [...defaultClassName, className].join(' ')

  return <h1 className={h1ClassName}>{children}</h1>
}
