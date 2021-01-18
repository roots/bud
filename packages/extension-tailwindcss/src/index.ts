import {Bud} from '@roots/bud'
import tailwindcss from 'tailwindcss'

// Config typings
export * from './interfaces'

// Extension ID
export const name = '@roots/bud-tailwindcss'

// bud.tailwindcss fn
export * as api from './api'

// Boot extension
export const boot = ({postcss, disk}: Bud): void => {
  postcss.addPlugin(
    tailwindcss,
    disk.get('project').get('tailwind.config.js') ?? null,
  )
}
