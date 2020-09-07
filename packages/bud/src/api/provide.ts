import {Api} from '@roots/bud-typings'

const provide: Api.Provide = function (options) {
  Object.entries(options).forEach(([key, modules]) => {
    const isString = typeof modules == 'string'
    const isObject = typeof modules == 'object'

    if (isString) {
      this.options.set('webpack.plugins.provide', {
        ...this.options.get('webpack.plugins.provide'),
        [`${modules}`]: key,
      })
      this.options.set('webpack.externals', {
        ...this.options.get('webpack.externals'),
        [`${modules}`]: key,
      })
    }

    if (isObject) {
      modules.map(module => {
        this.options.set('webpack.plugins.provide', {
          ...this.options.get('webpack.plugins.provide'),
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

export {provide}
