import {Bud} from '@roots/bud'

export const purge: Bud.PurgeCss.Config = function configuration(
  userOptions,
) {
  this.postcss.setPlugin([
    '@fullhuman/postcss-purgecss',
    userOptions,
  ])

  return this
}
