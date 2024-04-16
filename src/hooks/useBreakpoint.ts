import { createBreakpoint } from 'react-use'

const breakpoints = {
  '2xl': 1536,
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640,
}

export const useBreakpoint = createBreakpoint(breakpoints) as unknown as () => keyof typeof breakpoints
