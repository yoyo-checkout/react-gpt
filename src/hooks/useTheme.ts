import { useLocalStorage } from 'react-use'
import { Theme } from '@/types'

export const useTheme = () => {
  const [theme, setStorage] = useLocalStorage<Theme>('theme', 'system')
  const documentElement = document.documentElement
  const classList = documentElement.classList

  const themes: Theme[] = ['system', 'dark', 'light']

  const initTheme = () => {
    if (!theme || theme === 'system') {
      const mediaQuery = '(prefers-color-scheme: dark)'
      const matchMedia = window.matchMedia(mediaQuery)

      if (matchMedia.media !== mediaQuery || matchMedia.matches) {
        setTheme('dark')
      } else {
        setTheme('light')
      }
    } else if (theme) {
      setTheme(theme)
    }
  }

  const setTheme = (val: Theme) => {
    const updateVal = val === 'system' ? 'dark' : val

    classList.remove('dark', 'light')
    setStorage(val)
    documentElement.style.colorScheme = updateVal
    classList.add(updateVal)
  }

  const getThemeLabel = (val?: Theme) => {
    switch (val) {
      case 'system':
        return '系統'
      case 'dark':
        return '深色介面'
      case 'light':
        return '淺色介面'
      default:
        return ''
    }
  }

  return {
    theme,
    themes,
    initTheme,
    setTheme,
    getThemeLabel,
  }
}
