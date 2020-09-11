import {Plugin, PluginInterface} from '@roots/bud-types'
import PaletteWebpackPlugin from 'palette-webpack-plugin'

const palette: Plugin = (): PluginInterface => ({
  make: function () {
    this.bud.apply('setPaletteBlacklist', function (
      blacklist: string[],
    ) {
      this.options.set(
        'webpack.plugins.palettePlugin.blacklist',
        blacklist,
      )

      return this
    })

    this.bud.plugins.set('palette-webpack-plugin', () => ({
      make: function () {
        return new PaletteWebpackPlugin(
          this.bud.options.get('webpack.plugins.palettePlugin'),
        )
      },
    }))
  },
})

export {palette}
