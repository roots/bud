import {Api} from '@roots/bud-typings'

export const template: Api.Template = function (options?) {
  this.store.enable('features.html')

  options?.template &&
    this.extensions.set(
      'html-webpack-plugin.options.template',
      options.template,
    )

  options?.replacements &&
    this.extensions.set(
      'interpolate-html-plugin.options.replacements',
      options.replacements,
    )

  return this
}
