import {Bud} from './types'

type Provide = (options: {[key: string]: string[]}) => Bud

const provide: Provide = function (options) {
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
export type {Provide}
