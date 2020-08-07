import type {Options as StylelintOptions} from 'stylelint-webpack-plugin/declarations/getOptions'
type ConfigCall = (
  this: any,
  options: {
    enabled?: boolean
    options?: StylelintOptions
  },
) => any

const api: ConfigCall = function (
  options: {
    enabled?: boolean
    options?: StylelintOptions
  },
) {
  this.features.set('stylelint', options?.enabled ?? true)

  this.features.enabled('stylelint') &&
    this.options.set('stylelint', {
      configFile: this.configs.get('stylelint'),
      ...options,
    })

  return this
}

export default api
