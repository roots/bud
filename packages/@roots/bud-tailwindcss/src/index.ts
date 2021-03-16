import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import {tailwind} from './api'

// Extension ident
export const name: Module['name'] = '@roots/bud-tailwindcss'

// Dependencies
export const devDependencies = ['tailwindcss']

// Extension config
export const api: Module['api'] = {tailwind}

// Boot extension
export const boot: Module['boot'] = (app: Framework) => {
  const implementation = require.resolve('@tailwindcss/jit')
    ? '@tailwindcss/jit'
    : require.resolve('tailwindcss')
    ? 'tailwindcss'
    : null

  if (!implementation) {
    app.dashboard.error(
      'You must install tailwindcss or @tailwindcss/jit in order for @roots/bud-tailwindcss to function',
    )
  }

  app.store.set(
    'options.tailwindcss.implementation',
    implementation,
  )

  if (!app.disk.get('project').has('tailwind.config.js')) return

  app.tailwind(
    null,
    app.store.get('options.tailwindcss.implementation'),
  )
}
