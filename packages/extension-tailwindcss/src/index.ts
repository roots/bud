import {lodash as _} from '@roots/bud-support'
import {errorDependenciesUnmet} from './errors'

export * as api from './api'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwindcss = require('tailwindcss')

export const boot = (instance: Framework.Bud): void => {
  !instance.extensions.get('postcss') && errorDependenciesUnmet()

  instance.build.items.merge(
    `postcss.options.postcssOptions.plugins`,
    tailwindcss(instance.fs.get('tailwind.config.js') ?? null),
  )
}
