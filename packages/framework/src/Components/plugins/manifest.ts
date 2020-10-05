import * as Extension from '../../Extend/Extension'
import ManifestPlugin from 'webpack-manifest-plugin'

const manifest: Extension.Factory = bud => ({
  bud,

  options: {
    publicPath: bud.store['build'].get('output.publicPath'),
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
