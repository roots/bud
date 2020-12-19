import type {Theme} from '../typings'

export const spacing: Theme['spacing'] = 1

export const colors: Theme['colors'] = {
  primary: '#545DD7',
  error: '#dc3545',
  warning: '#FF611A',
  faded: '#6C758F',
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
