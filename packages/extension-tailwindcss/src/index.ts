import './interface'
import {Bud} from '@roots/bud'
import tailwindcss from 'tailwindcss'

// Extension ident
export const name = '@roots/bud-tailwindcss'

// Extension config
export * as api from './api'

// Boot extension
export const boot = (bud: Bud): void => {
  bud.disk.get('project').has('tailwind.config.js') &&
    bud.postcss.addPlugin(tailwindcss)
}
