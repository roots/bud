import {Bud} from '@roots/bud'
import Plugin from '@fullhuman/postcss-purgecss'

export const purge: Bud.PurgeCss.Config = function configuration(
  userOptions,
) {
  this.postcss.addPlugin(Plugin(userOptions))

  return this
}
