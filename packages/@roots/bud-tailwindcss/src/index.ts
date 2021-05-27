import './interface'
import {Framework, Module} from '@roots/bud-framework'
import {tailwind} from './api'

export const name: Module['name'] = '@roots/bud-tailwindcss'

export const api: Module['api'] = {tailwind}

export const boot: Module['boot'] = (app: Framework) => {
  /**
   * Exit early if requirements not met
   */
  if (
    !app.discovery.has('devDependencies.postcss') ||
    !app.discovery.has('devDependencies.tailwindcss')
  ) {
    return
  }

  const implementation = app.discovery.has(
    'devDependencies.@tailwindcss/jit',
  )
    ? '@tailwindcss/jit'
    : 'tailwindcss'

  app.tailwind(null, implementation)
}
