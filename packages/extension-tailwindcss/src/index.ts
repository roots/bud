import {lodash as _} from '@roots/bud-support'
import {errorDependenciesUnmet} from './errors'
import {tailwind} from './api'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwindcss = require('tailwindcss')

export const boot = (instance: Framework.Bud): void => {
  const fs = instance.disk.get('project')
  Object.assign(instance, {tailwind})

  !_.isObject(instance.css) &&
    errorDependenciesUnmet(fs.readJson('package.json'))

  if (!fs.has('tailwind.config.js')) return

  const loader = instance.build.items['postcss'].make()

  instance.build.items['postcss'].setOptions({
    ...loader.options,
    postcssOptions: {
      ...loader.options.postcssOptions,
      plugins: [
        ...loader.options.postcssOptions.plugins,
        tailwindcss(fs.get('tailwind.config.js')),
      ],
    },
  })
}
