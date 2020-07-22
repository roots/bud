import ManifestPlugin from 'webpack-manifest-plugin'

const manifest: WebpackAdapter = () => ({
  setOptions: function () {
    return {
      publicPath: this.bud.paths.public,
      filename: 'manifest.json',
      writeToFileEmit: true,
    }
  },
  make: function () {
    return new ManifestPlugin(this.options)
  },
})

export {manifest}
import type {WebpackAdapter} from '../..'
