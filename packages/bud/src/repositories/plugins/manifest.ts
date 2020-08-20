import ManifestPlugin from 'webpack-manifest-plugin'
import type {WebpackAdapter} from './types'

const manifest = () => ({
  setOptions: function () {
    return {
      publicPath:
        this.bud.options.get('manifest.publicPath') ?? this.bud.paths.public ?? '/',
      filename: this.bud.options.get('manifest.name') ?? 'manifest.json',
      writeToFileEmit: this.bud.options.get('manifest.writeToFileEmit') ?? true,
    }
  },
  make: function () {
    return new ManifestPlugin(this.options)
  },
  when: function () {
    return this.bud.features.enabled('manifest')
  },
})

export {manifest}
