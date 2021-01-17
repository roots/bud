import {Bud} from '@roots/bud'

export const entrypoints: Bud.Entrypoints = function (
  options: any,
) {
  this.extensions.set('@roots/bud-entrypoints.options', options)
  return this
}
