import {lodash as _} from '@roots/bud-support'

export const provide: Framework.API.Provide = function (options) {
  Object.entries(options).forEach(([key, modules]) => {
    const isString = typeof modules == 'string'

    if (isString) {
      this.extensions.setOptions('provide', {
        ...this.extensions.getOptions('provide'),
        [`${modules}`]: key,
      })

      this.build.config.set('externals', {
        ...this.build.config.get('externals'),
        [`${modules}`]: key,
      })
    }

    if (_.isArray(modules)) {
      modules.map(module => {
        this.extensions.setOptions('provide', {
          ...this.extensions.getOptions('provide'),
          [module]: key,
        })

        this.build.config.set('externals', {
          ...this.build.config.get('externals'),
          [`${module}`]: key,
        })
      })
    }
  })

  return this
}
