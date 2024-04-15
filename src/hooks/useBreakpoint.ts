import { createBreakpoint } from 'react-use'

export const useBreakpoint = createBreakpoint({
  '2xl': 1536,
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640,
}) as unknown as () => '2xl' | 'xl' | 'lg' | 'md' | 'sm'
