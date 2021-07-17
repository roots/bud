import {Framework} from '@roots/bud-framework'

export const purge: Framework.Api.Purge = function configuration(
  userOptions,
) {
  this.postcss.setPlugin([
    '@fullhuman/postcss-purgecss',
    userOptions,
  ])

  return this
}
