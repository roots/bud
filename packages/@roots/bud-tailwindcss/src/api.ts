import type {Tailwind} from './interface'
import type {TailwindConfig} from 'tailwindcss/tailwind-config'

const tailwind: Tailwind.Configure = function (config) {
  const tailwindcss: [string, TailwindConfig | string] = config
    ? ['tailwindcss', config]
    : ['tailwindcss', this.path('project', 'tailwind.config.js')]

  this.postcss.setPlugins({
    import: this.postcss.plugins['import'] ?? 'postcss-import',
    tailwindcss,
    'preset-env':
      this.postcss.plugins['preset-env'] ?? 'postcss-preset-env',
  })

  return this
}

export {tailwind}
