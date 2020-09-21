import ManifestPlugin from 'webpack-manifest-plugin'
import {BudInterface, Plugin} from '../'

const manifest: Plugin = (bud: BudInterface) => ({
  bud,

  make: function () {
    return new ManifestPlugin({
      publicPath:
        this.bud.options.get('manifest.publicPath') ??
        this.bud.paths.get('dist') ??
        '/',
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
