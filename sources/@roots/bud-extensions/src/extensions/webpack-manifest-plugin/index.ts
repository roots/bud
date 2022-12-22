import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {isUndefined} from '@roots/bud-support/lodash-es'
import {
  ManifestPluginOptions as Options,
  WebpackManifestPlugin,
} from 'webpack-manifest-plugin'

/**
 * `webpack-manifest-plugin` adapter
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 * @decorator `@options`
 */
@label(`@roots/bud-extensions/webpack-manifest-plugin`)
@plugin(WebpackManifestPlugin)
@options({
  fileName: `manifest.json`,
  writeToFileEmit: true,
  publicPath: ({hooks}: Bud) =>
    (hooks.filter(`build.output.publicPath`) ?? ``).replace(`auto`, ``),
})
export default class BudWebpackManifestPlugin extends Extension<
  Options,
  WebpackManifestPlugin
> {
  /**
   * `when` callback
   *
   * @remarks
   * Returns `feature.manifest` hook result
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async when(bud: Bud) {
    if (!bud.isCLI()) return bud.hooks.filter(`feature.manifest`, true)

    if (!isUndefined(bud.context.args.manifest))
      return bud.context.args.manifest

    return bud.hooks.filter(`feature.manifest`, true)
  }
}
