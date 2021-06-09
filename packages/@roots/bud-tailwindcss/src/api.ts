import {Tailwind} from './interface'

const tailwind: Tailwind.Configure = function (config) {
  const integration: [string, Tailwind.Config | string] = config
    ? ['tailwindcss', config]
    : ['tailwindcss', this.path('project', 'tailwind.config.js')]

  const plugins = Object.values(this.postcss.plugins)

  this.discovery.hasPeerDependency('postcss-import')
    ? this.postcss.setPlugins([
        'postcss-import',
        integration,
        ...plugins,
      ])
    : this.postcss.setPlugins([integration, ...plugins])

  return this
}

export {tailwind}
