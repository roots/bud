import {Bud, Extension} from '@roots/bud-framework'
import {
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import type {Options} from '@roots/bud-support/webpack-manifest-plugin'
import {Plugin} from '@roots/bud-support/webpack-manifest-plugin'

/**
 * Manifest configuration
 */
@label(`@roots/bud-extensions/webpack-manifest-plugin`)
@expose(`manifest`)
@plugin(Plugin)
@options({
  fileName: `manifest.json`,
  writeToFileEmit: true,
  publicPath: (app: Bud) => app.publicPath().replace(`auto`, ``),
})
export default class BudManifestExtension extends Extension<
  Options,
  Plugin
> {}
