import type {Index, Bud} from '@roots/bud-typings'

export const template: Template = function (options?) {
  this.features.set('html', true)

  options?.template &&
    this.extensions
      .get('html-webpack-plugin')
      .merge('template', options.template)

  options?.replacements &&
    this.extensions
      .get('interpolate-html-plugin')
      .mergeStore(options.replacements)

  return this
}

export type Template<T = Bud.Contract> = (
  this: T,
  options?: {
    template: string
    replacements: Index<string>
  },
) => T
