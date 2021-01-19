import type {Api} from '@roots/bud-typings'

export const minify: Api.Minify = function () {
  this.options.enable('minify')

  return this
}
