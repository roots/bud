import ManifestPlugin from 'webpack-manifest-plugin'
import * as Extension from './../../Extend/Extension'

const manifest: Extension.Factory = bud => ({
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
