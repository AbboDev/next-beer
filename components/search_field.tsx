import { ChangeEventHandler, ReactNode } from 'react'

type Props = {
  label?: string
  id: string
  name?: string
  onChange?: ChangeEventHandler
  value?: string
  autocomplete?: string[]
  className?: string
  placeholder?: string
  children?: ReactNode
}

export default function SearchField({
  label,
  onChange,
  value,
  autocomplete,
  id,
  name,
  className,
  placeholder,
  children,
}: Props) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block mb-1">
        {label || children}
      </label>

      <input
        type="search"
        id={id}
        name={name || id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="rounded transition-colors text-slate-400 dark:bg-white py-2 px-4 w-full"
        list={`${id}-autocomplete`}
      />

      <datalist id={`${id}-autocomplete`}>
        {autocomplete?.length &&
          autocomplete.map((name) => <option value={name} key={name} />)}
      </datalist>
    </div>
  )
}
