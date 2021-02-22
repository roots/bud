import {Framework} from '@roots/bud-framework'

export const setOptions: Framework.Babel.SetOptions = function (
  opts,
) {
  this.build.merge('items.babel.options', opts)

  return this
}
