import {Api} from '@roots/bud-typings'

export const template: Api.Template = function (options?) {
  this.features.set('html', true)

  options?.template &&
    this.extensions
      .get('html-webpack-plugin')
      .set('template', options.template)

  options?.replacements &&
    this.extensions
      .get('interpolate-html-plugin')
      .mergeStore(options.replacements)

  return this
}
