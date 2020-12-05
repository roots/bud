import type {Theme} from './'

export const spacing: Theme['spacing'] = 1

export const colors: Theme['colors'] = {
  primary: '#545DD7',
  error: '#dc3545',
  warning: '#CCD479',
  faded: '#6C758F',
  success: '#46D46A',
  accent: '#ff69b4',
}

export const screens: Theme['screens'] = [
  [0, 40],
  [41, 60],
  [61, 80],
  [81, Infinity],
]

export const columns: Theme['columns'] = 12
