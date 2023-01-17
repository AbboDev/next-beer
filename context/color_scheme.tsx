import { ReactNode, createContext, useContext, useState } from 'react'

type Props = {
  children?: ReactNode
}

type Context = {
  // setDark: Dispatch<SetStateAction<boolean>>
  toggleColorScheme: (on?: boolean) => void
  dark: boolean
}

export const ColorSchemeContext = createContext<Context>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorScheme: () => {},
  // toggleColorScheme: () => {},
  dark: true,
})

export function ColorScheme({ children }: Props) {
  const [dark, setDark] = useState(true)

  const toggleColorScheme = (on?: boolean) => {
    const isDark = typeof on !== 'boolean' ? !dark : on
    setDark(isDark)

    document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
  }

  return (
    <ColorSchemeContext.Provider value={{ toggleColorScheme, dark }}>
      {children}
    </ColorSchemeContext.Provider>
  )
}

export function useColorSchemeContext() {
  return useContext(ColorSchemeContext)
}
