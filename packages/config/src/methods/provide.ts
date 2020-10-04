import {Config} from '..'

export const provide: Config.Provide = function (options) {
  Object.entries(options).forEach(([key, modules]) => {
    const isString = typeof modules == 'string'

    if (isString) {
      this.store['plugins'].set('provide', {
        ...this.store['plugins'].get('provide'),
        [`${modules}`]: key,
      })
      this.store['build'].set('externals', {
        ...this.store['build'].get('.externals'),
        [`${modules}`]: key,
      })
    }

    const isObject = typeof modules == 'object'

    if (isObject) {
      modules.map(module => {
        this.store['plugins'].set('provide', {
          ...this.store['plugins'].get('provide'),
          [module]: key,
        })
        this.store['build'].set('externals', {
          ...this.store['build'].get('.externals'),
          [`${module}`]: key,
        })
      })
    }
  })

  return this
}
