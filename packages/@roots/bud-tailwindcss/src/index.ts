import './interface'
import {Framework, Module} from '@roots/bud-framework'
import {tailwind} from './api'

export const name: Module['name'] = '@roots/bud-tailwindcss'

export const api: Module['api'] = {tailwind}

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

  app.tailwind(null, implementation)
}
