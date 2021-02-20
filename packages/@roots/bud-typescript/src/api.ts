import {Bud} from '@roots/bud'

export const typescript: Bud.Typescript.Config = function (
  options,
) {
  this.extensions
    .get('@roots/bud-typescript')
    .set('options', options)

  return this
}
