import ManifestPlugin from 'webpack-manifest-plugin'
import Bud from '@roots/bud-types'

const manifest: Bud.Plugin.Factory = bud => ({
  bud,

  options: {
    publicPath: bud.store['webpack'].get('output.publicPath'),
    fileName: 'manifest.json',
    writeToFileEmit: true,
  },

  make: function () {
    return new ManifestPlugin(this.options)
  },

  when: function () {
    return this.bud.store['features'].enabled('manifest')
  },
})

export {manifest as default}
