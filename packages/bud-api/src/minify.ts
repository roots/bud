import type {Api} from '@roots/bud-typings'

export const minify: Api.Minify = function () {
  this.store.enable('features.minify')

  return this
}
