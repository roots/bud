import Bud from '@roots/bud-types'

export const provide: Bud.Config.Provide = function (options) {
  Object.entries(options).forEach(([key, modules]) => {
    const isString = typeof modules == 'string'

    if (isString) {
      this.options.set('plugins.provide', {
        ...this.options.get('plugins.provide'),
        [`${modules}`]: key,
      })
      this.options.set('webpack.externals', {
        ...this.options.get('webpack.externals'),
        [`${modules}`]: key,
      })
    }

    const isObject = typeof modules == 'object'

    if (isObject) {
      modules.map(module => {
        this.options.set('plugins.provide', {
          ...this.options.get('plugins.provide'),
          [module]: key,
        })
        this.options.set('webpack.externals', {
          ...this.options.get('webpack.externals'),
          [`${module}`]: key,
        })
      })
    }
  })

  return this
}
