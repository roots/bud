import type {Theme} from '../'

export const spacing: Theme['spacing'] = 1

export const colors: Theme['colors'] = {
  foreground: '#FFFFFF',
  faded: '#6C758F',
  primary: '#545DD7',
  primaryAlt: '#663399',
  error: '#dc3545',
  errorAlt: '#b22222',
  warning: '#FF611A',
  success: '#46D46A',
  accent: '#ff69b4',
  flavor: '#78C5D7',
}

export const screens: Theme['screens'] = [
  [0, 40],
  [41, 60],
  [61, 80],
  [81, Infinity],
]

export const columns: Theme['columns'] = 12

export const maxWidth = 100

export const maxHeight = 999
