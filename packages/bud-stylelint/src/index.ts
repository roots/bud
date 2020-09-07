import {Bud, Plugin} from '@roots/bud-typings'
import StylelintPlugin from 'stylelint-webpack-plugin'
import type {Options as StylelintOptions} from 'stylelint-webpack-plugin/declarations/getOptions'
import {resolve} from 'path'

const plugin: Plugin = (bud: Bud) => ({
  bud,

  make: function () {
    const config = this.bud.fs.join(
      this.bud.project('stylelint.config.js'),
    )

    if (this.bud.fs.existsSync(config)) {
      this.bud.features.enable('stylelint')
      this.bud.configs.set('stylelint', config)

      this.bud.options.set(
        'webpack.plugins.stylelint.configFile',
        this.bud.configs.get('stylelint'),
      )
    }

    this.bud.apply('stylelint', function (
      options: StylelintOptions,
    ) {
      this.features.enable('stylelint')
      this.options.set('webpack.plugins.stylelint', options)

      return this
    })

    this.bud.plugins.set(
      'stylelint-webpack-plugin',
      (bud: Bud) => ({
        bud,

        make: function () {
          return new StylelintPlugin({
            configFile:
              this.bud.options.get(
                'webpack.plugins.stylelint.configFile',
              ) ||
              this.bud.configs.get('webpack.plugins.stylelint'),
            ...this.bud.options.get('webpack.plugins.stylelint'),
          })
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
