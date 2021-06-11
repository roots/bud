import {Tailwind} from './interface'

const tailwind: Tailwind.Configure = function (config) {
  const tailwindcss: [string, Tailwind.Config | string] = config
    ? ['tailwindcss', config]
    : ['tailwindcss', this.path('project', 'tailwind.config.js')]

  this.postcss.setPlugins({
    import: this.postcss.plugins['import'] ?? 'postcss-import',
    tailwindcss,
    'preset-env':
      this.postcss.plugins['preset-env'] ?? 'preset-env',
  })

  return this
}

export {tailwind}
