import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
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
@label('webpack-manifest-plugin')
@plugin(WebpackManifestPlugin)
@options({
  fileName: 'manifest.json',
  writeToFileEmit: true,
  publicPath: ({hooks}) =>
    (hooks.filter('build.output.publicPath') ?? '').replace('auto', ''),
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
  public async when() {
    return this.app.hooks.filter('feature.manifest')
  }
}
