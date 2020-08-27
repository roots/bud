import {Bud} from './types'

type Auto = (options: {[key: string]: string[]}) => Bud

const auto: Auto = function (options) {
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

    typeof modules !== 'object' &&
      typeof modules !== 'string' &&
      console.error(
        'auto values must be either a string or an array.',
      )
  })

  return this
}

export {auto}
export type {Auto}
