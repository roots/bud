export const provide: API.Provide = function (options) {
  Object.entries(options).forEach(([key, modules]) => {
    const isString = typeof modules == 'string'

    if (isString) {
      this.store['plugins'].set('provide', {
        ...this.store['plugins'].get('provide'),
        [`${modules}`]: key,
      })
      this.build.config.set('externals', {
        ...this.build.config.get('.externals'),
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
        this.build.config.set('externals', {
          ...this.build.config.get('.externals'),
          [`${module}`]: key,
        })
      })
    }
  })

  return this
}
