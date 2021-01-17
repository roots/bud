import {Api} from '@roots/bud-typings'

export const html: Api.Html = function (options?) {
  this.options.enable('html')

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
