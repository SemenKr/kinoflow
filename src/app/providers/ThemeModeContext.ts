import { createContext } from 'react'

export type ThemeMode = 'light' | 'dark'

export type ThemeModeContextValue = {
  mode: ThemeMode
  toggleTheme: () => void
}

export const ThemeModeContext = createContext<ThemeModeContextValue>({
  mode: 'dark',
  toggleTheme: () => {},
})
