import ManifestPlugin from 'webpack-manifest-plugin'
import type {Plugin} from '@roots/bud-types'

const manifest: Plugin = bud => ({
  bud,

  options: {
    publicPath:
      bud.options.get('manifest.publicPath') ??
      bud.paths.get('public') ??
      '/',
    filename:
      bud.options.get('manifest.name') ?? 'manifest.json',
    writeToFileEmit:
      bud.options.get('manifest.writeToFileEmit') ?? true,
  },

  make: function () {
    return new ManifestPlugin(this.options)
  },

  when: function () {
    return this.bud.features.enabled('manifest')
  },
})

export {manifest}
