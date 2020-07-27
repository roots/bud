import ManifestPlugin from 'webpack-manifest-plugin'
import type {WebpackAdapter} from './types'

const manifest: WebpackAdapter = () => ({
  setOptions: function () {
    return {
      publicPath: this.bud.state.paths.public ?? '/',
      filename: 'manifest.json',
      writeToFileEmit: true,
    }
  },
  make: function () {
    return new ManifestPlugin(this.options)
  },
  when: function () {
    return this.bud.state.features.manifest
  },
})

export {manifest}
