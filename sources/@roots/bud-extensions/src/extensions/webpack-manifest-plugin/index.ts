import type {Options} from '@roots/bud-support/webpack-manifest-plugin'

import {Extension} from '@roots/bud-framework/extension'
import {
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import Value from '@roots/bud-support/value'
import {Plugin} from '@roots/bud-support/webpack-manifest-plugin'

/**
 * Manifest configuration
 */
@label(`@roots/bud-extensions/webpack-manifest-plugin`)
@expose(`manifest`)
@plugin(Plugin)
@options<Options>({
  fileName: `manifest.json`,
  publicPath: Value.make(({publicPath}) =>
    (publicPath() ?? ``).replace(`auto`, ``),
  ),
})
export default class BudManifestExtension extends Extension<
  Options,
  Plugin
> {}
