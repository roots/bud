import {Bud, Plugin, PluginInterface} from '@roots/bud-types'
import {resolve} from 'path'

const plugin: Plugin = (bud: Bud) => ({
  bud,

  make: function (this: PluginInterface) {
    const config =
      this.bud.fs.project('.eslintrc.js') ||
      this.bud.fs.project('.eslintrc.json')

    if (!this.bud.fs.existsSync(config)) {
      return
    }

    this.bud.features.set('eslint', true)

    this.bud.loaders.set('eslint', {
      loader: require.resolve('eslint-loader'),
      options: {
        configFile: this.bud.fs.get('eslint'),
        formatter: 'codeframe',
        failOnError: true,
        fix: this.bud.args.get('fix') ?? false,
      },
    })

    this.bud.hooks.on('webpack.module.rules.js.use', loaders => [
      ...loaders,
      this.bud.loaders.get('eslint'),
    ])
  },
})

const presets = {
  roots: resolve(__dirname, './preset/roots.js'),
  wordpress: resolve(__dirname, './preset/wordpress.js'),
  react: resolve(__dirname, './preset/react.js'),
}

module.exports = {plugin, presets}
