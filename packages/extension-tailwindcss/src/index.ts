import {Bud} from '@roots/bud'
import tailwindcss from 'tailwindcss'

// Config typings
export * from './interfaces'

// Extension ID
export const name = '@roots/bud-tailwindcss'

// bud.tailwindcss fn
export * as api from './api'

// Boot extension
export const boot = (bud: Bud): void => {
  bud.disk.get('project').has('tailwind.config.js') &&
    bud.postcss.addPlugin(
      tailwindcss,
      bud.disk.get('project').get('tailwind.config.js'),
    )
}
