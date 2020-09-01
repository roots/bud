import {Api} from '@roots/bud-typings'

const provide: Api.Provide = function (options) {
  Object.entries(options).forEach(([key, modules]) => {
    const isString = typeof modules == 'string'
    const isObject = typeof modules == 'object'

    isString &&
      this.options.set('webpack.plugins.provide', {
        ...this.options.get('webpack.plugins.provide'),
        [`${modules}`]: key,
      })

    isObject &&
      modules.map(handle => {
        this.options.set('webpack.plugins.provide', {
          ...this.options.get('webpack.plugins.provide'),
          [handle]: key,
        })
      })
  })

  return this
}

export {provide}
