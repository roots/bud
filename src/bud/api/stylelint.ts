import type {Bud, Stylelint, StylelintOptions} from './types'

const stylelint: Stylelint = function (options: {
  enabled?: boolean
  options?: StylelintOptions
}): Bud {
  this.features.set('stylelint', options?.enabled ?? true)

  this.features.enabled('stylelint') &&
    this.options.set('stylelint', {
      configFile: this.configs.get('stylelint'),
      ...options,
    })

  return this
}

export {stylelint}
