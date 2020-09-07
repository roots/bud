import {Bud, Plugin, PluginInterface} from '@roots/bud-typings'

const plugin: Plugin = (bud: Bud) => ({
  bud,

  presets: function () {
    return {
      roots: this.bud.fs.from(__dirname, './preset/roots.js'),
      wordpress: this.bud.fs.from(
        __dirname,
        './preset/wordpress.js',
      ),
      react: this.bud.fs.from(__dirname, './preset/react.js'),
    }
  },

  make: function (this: PluginInterface) {
    const config = this.bud.project('.eslintrc.js')

    if (!this.bud.fs.existsSync(config)) {
      return
    }

    this.bud.configs.set('eslint', config)

    this.bud.features.set('eslint', true)

    this.bud.hooks.filter(
      'webpack.module.rules.js.use',
      ({use, bud}) => [
        bud.uses.get('babel'),
        bud.uses.get('eslint'),
      ],
    )

    this.bud.uses.set('eslint', (bud: Bud) => ({
      loader: require.resolve('eslint-loader'),
      options: {
        configFile: bud.configs.get('eslint'),
        formatter: 'codeframe',
        failOnError: true,
      },
    }))
  },
})

export {plugin as default}
module.exports = plugin
