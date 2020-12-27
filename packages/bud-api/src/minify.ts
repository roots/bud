import type {Api} from '@roots/bud-typings'

export const minify: Api.Minify = function () {
  this.features.set('minify', true)

  return this
}
