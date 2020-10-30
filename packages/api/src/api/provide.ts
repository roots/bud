import {lodash as _} from '@roots/bud-support'

export const provide: Framework.API.Provide = function (
  options,
) {
  Object.entries(options).forEach(([key, modules]) => {
    _.isString(modules)
      ? (() => {
          this.extensions.setOptions('provide', {
            ...this.extensions.getOptions('provide'),
            [`${modules}`]: key,
          })

          this.build.config.set('externals', {
            ...this.build.config.get('externals'),
            [`${modules}`]: key,
          })
        })()
      : _.isArray(modules) &&
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
  })

  return this
}
