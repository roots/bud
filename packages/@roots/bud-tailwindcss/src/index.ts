import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import {tailwind} from './api'

// Extension ident
export const name: Module['name'] = '@roots/bud-tailwindcss'

// Dependencies
export const devDependencies = [
  '@roots/bud-postcss',
  'tailwindcss',
]

// Extension config
export const api: Module['api'] = {tailwind}

// Boot extension
export const boot: Module['boot'] = (app: Framework) => {
  if (app.disk.get('project').has('postcss.config.js')) return
  app.tailwind()
}
