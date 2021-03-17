import {Bud} from '@roots/bud'

export const purge: Bud.PurgeCss.Config = function configuration(
  userOptions,
) {
  this.postcss.set(['@fullhuman/postcss-purgecss', userOptions])

  return this
}
