import {BudInterface} from '../'

/**
 * ## bud.provide
 *
 * Define variable aliases
 *
 * ```js
 * bud.provide({jquery: ['$', 'window.jQuery']})
 * ```
 */
export type Provide = (options: {
  [key: string]: string[]
}) => BudInterface

const provide: Provide = function (options) {
  Object.entries(options).forEach(([key, modules]) => {
    const isString = typeof modules == 'string'
    const isObject = typeof modules == 'object'

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

export {provide as default}
