import { useLocalStorage } from 'react-use'
import { Theme } from '@/types'

export const useTheme = () => {
  const [theme, setStorage] = useLocalStorage<Theme>('theme', 'system')
  const documentElement = document.documentElement
  const classList = documentElement.classList

  const initTheme = () => {
    classList.remove('dark', 'light')

    if (!theme || theme === 'system') {
      const mediaQuery = '(prefers-color-scheme: dark)'
      const matchMedia = window.matchMedia(mediaQuery)

      if (matchMedia.media !== mediaQuery || matchMedia.matches) {
        setTheme('dark', !theme)
      } else {
        setTheme('light', !theme)
      }
    } else if (theme) {
      setTheme(theme)
    }
  }

  const setTheme = (val: Theme, updateStorage = false) => {
    updateStorage && setStorage(val)
    documentElement.style.colorScheme = val
    classList.add(val)
  }

  return {
    initTheme,
    setTheme,
  }
}
