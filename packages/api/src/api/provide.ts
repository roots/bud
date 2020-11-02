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
        })()
      : _.isArray(modules) &&
        modules.map(module => {
          this.extensions.setOptions('provide', {
            ...this.extensions.getOptions('provide'),
            [module]: key,
          })
        })
  })

  return this
}
