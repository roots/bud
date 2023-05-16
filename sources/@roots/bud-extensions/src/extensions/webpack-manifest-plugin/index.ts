import {Bud, Extension} from '@roots/bud-framework'
import {
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {WebpackManifestPlugin} from 'webpack-manifest-plugin'

/**
 * Manifest configuration
 */
@label(`@roots/bud-extensions/webpack-manifest-plugin`)
@expose(`manifest`)
@plugin(WebpackManifestPlugin)
@options({
  fileName: `manifest.json`,
  writeToFileEmit: true,
  publicPath: ({hooks}: Bud) =>
    (hooks.filter(`build.output.publicPath`) ?? ``).replace(`auto`, ``),
})
export default class BudManifestExtension extends Extension<
  WebpackManifestPlugin[`options`],
  WebpackManifestPlugin
> {}
