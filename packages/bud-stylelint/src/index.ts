import type Bud from '@roots/bud-types'
import StylelintPlugin from 'stylelint-webpack-plugin'
import type {Options as StylelintOptions} from 'stylelint-webpack-plugin/declarations/getOptions'
import {resolve} from 'path'

const plugin: Bud.Plugin.Factory = (bud: Bud) => ({
  bud,

  make: function () {
    if (this.bud.fs.get('stylelint.config.js')) {
      this.bud.features.enable('stylelint')

      this.bud.options.set(
        'webpack.plugins.stylelint.configFile',
        this.bud.fs.get('stylelint.config.js'),
      )
    }

    this.bud.apply('stylelint', function (
      options: StylelintOptions,
    ) {
      this.features.enable('stylelint')

      this.options.set('webpack.plugins.stylelint', options)

      return this
    })

    this.bud.webpackPlugins.set(
      'stylelint-webpack-plugin',
      (bud: Bud) => ({
        bud,

        make: function () {
          return new StylelintPlugin(
            this.bud.options.get('webpack.plugins.stylelint'),
          )
        },

        when: function () {
          return this.bud.features.enabled('stylelint')
        },
      }),
    )
  },
})

const preset = {
  roots: resolve(__dirname, './preset/index.js'),
}

export {plugin, preset}
module.exports = {plugin, preset}
