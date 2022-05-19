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

@label('webpack-manifest-plugin')
@plugin(WebpackManifestPlugin)
@options({
  fileName: 'manifest.json',
  writeToFileEmit: true,
  publicPath: ({hooks}) =>
    (hooks.filter('build.output.publicPath') ?? '').replace('auto', ''),
})
class BudWebpackManifestPlugin extends Extension<
  Options,
  WebpackManifestPlugin
> {
  @bind
  public async when() {
    return this.app.hooks.filter('feature.manifest')
  }
}

export default BudWebpackManifestPlugin
