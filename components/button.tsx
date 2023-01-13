import { ReactNode, MouseEventHandler } from 'react'
import Link from 'next/link'

type Props = {
  children?: ReactNode
  tag?: string
  href?: string
  className?: string
  onClick?: MouseEventHandler
  disabled?: boolean
}

export default function Button({
  children,
  tag = 'button',
  href,
  className,
  onClick,
  disabled = false,
}: Props) {
  const defaultClassName: string[] = [
    'inline-block',
    'transition',
    'duration-200',
    'py-2',
    'px-3',
    'rounded-md',
    'bg-white',
    'text-slate-900',
    'dark:bg-slate-700',
    'dark:text-slate-200',
    'hover:-translate-x-1',
    'hover:-translate-y-1',
    // 'hover:text-slate-900',
    'hover:bg-teal-300',
    // 'hover:dark:text-slate-200',
    'hover:dark:bg-teal-700',
  ]

  const buttonClassName: string = [...defaultClassName, className].join(' ')

  if (tag === 'link' && href) {
    return (
      <Link
        className={buttonClassName}
        href={href}
        onClick={onClick}
        // disabled={disabled}
      >
        {children}
      </Link>
    )
  }

  const CustomTag = tag as keyof JSX.IntrinsicElements

  return (
    <CustomTag
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </CustomTag>
  )
}
