import {Framework} from '@roots/bud-framework'

export const typescript: Framework.Typescript.Config = function (
  options,
) {
  this.extensions
    .get('@roots/bud-typescript')
    .set('options', options)

  return this
}
