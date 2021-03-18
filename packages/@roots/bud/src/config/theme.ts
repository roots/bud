import {Framework} from '@roots/bud-framework'

export const theme: Framework.Config['theme'] = {
  spacing: 1,
  colors: {
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
  },
  screens: [
    [0, 40],
    [41, 60],
    [61, 80],
    [81, Infinity],
  ],
  columns: 12,
}
