import ManifestPlugin from 'webpack-manifest-plugin'
import Bud from '@roots/bud-types'

const manifest: Bud.Plugin.Factory = bud => ({
  bud,

  make: function () {
    return new ManifestPlugin({
      publicPath: this.bud.options.get(
        'webpack.output.publicPath',
      ),
      fileName:
        this.bud.options.get('manifest.name') ?? 'manifest.json',
      writeToFileEmit:
        bud.options.get('manifest.writeToFileEmit') ?? true,
    })
  },

  when: function () {
    return this.bud.features.enabled('manifest')
  },
})

export {manifest as default}
