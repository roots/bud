import {Framework} from '@roots/bud-framework'

export const purge: Framework.PurgeCss.Config = function configuration(
  userOptions,
) {
  this.postcss.set(['@fullhuman/postcss-purgecss', userOptions])

  return this
}
