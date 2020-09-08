import {Bud, Plugin, PluginInterface} from '@roots/bud-typings'
import path from 'path'

const plugin: Plugin = (bud: Bud) => ({
  bud,

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

const presets = {
  roots: path.resolve(__dirname, './preset/roots.js'),
  wordpress: path.resolve(__dirname, './preset/wordpress.js'),
  react: path.resolve(__dirname, './preset/react.js'),
}

export {plugin, presets}
