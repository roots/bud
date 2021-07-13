import {Framework} from '@roots/bud-framework'
import Purge from '@fullhuman/postcss-purgecss'

export const purge: Framework.Api.Purge = function configuration(
  userOptions,
) {
  this.postcss.setPlugin('@fullhuman/postcss-purgecss', [
    Purge,
    userOptions,
  ])

  return this
}
