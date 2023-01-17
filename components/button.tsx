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
    'bg-slate-700',
    'text-slate-200',
    'shadow-md',
    'shadow-slate-600',
    'dark:shadow-slate-900',
    'hover:-translate-x-1',
    'hover:-translate-y-1',
    'hover:bg-teal-700',
  ]

  if (disabled) {
    defaultClassName.push(
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      'disabled:translate-x-0',
      'disabled:translate-y-0',
      'disabled:bg-slate-700',
      'disabled:shadow-none'
    )
  }

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
