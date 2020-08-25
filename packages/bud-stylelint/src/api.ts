import type {Bud} from '@roots/bud'
import type {Options as StylelintOptions} from 'stylelint-webpack-plugin/declarations/getOptions'

type ConfigCall = (
  this: Bud,
  options: {
    enabled?: boolean
    options?: StylelintOptions
  },
) => Bud

const api: ConfigCall = function (options: {
  enabled?: boolean
  options?: StylelintOptions
}) {
  this.features.set('stylelint', options?.enabled ?? true)

  this.features.enabled('stylelint') &&
    this.options.set('stylelint', {
      configFile: this.configs.get('stylelint'),
      ...options,
    })

  return this
}

export default api
