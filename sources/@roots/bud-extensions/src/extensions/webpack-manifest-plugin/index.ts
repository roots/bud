import {Bud, Extension} from '@roots/bud-framework'
import {
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import Value from '@roots/bud-framework/value'
import type {Options} from '@roots/bud-support/webpack-manifest-plugin'
import {Plugin} from '@roots/bud-support/webpack-manifest-plugin'

/**
 * Manifest configuration
 */
@label(`@roots/bud-extensions/webpack-manifest-plugin`)
@expose(`manifest`)
@plugin(Plugin)
@options<Options>({
  fileName: `manifest.json`,
  publicPath: new Value(({hooks}: Bud) =>
    (hooks.filter(`build.output.publicPath`) ?? ``).replace(`auto`, ``),
  ),
})
export default class BudManifestExtension extends Extension<
  Options,
  Plugin
> {}
