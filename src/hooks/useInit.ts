import { useEffect } from 'react'
import { useTheme } from './useTheme'

export const useInit = () => {
  const { initTheme } = useTheme()

  useEffect(() => {
    initTheme()
  }, [])
}
