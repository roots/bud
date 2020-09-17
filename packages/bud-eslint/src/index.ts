import {BudInterface, Plugin} from '@roots/bud'
import {resolve} from 'path'

const plugin: Plugin = (bud: BudInterface) => ({
  bud,

  make: function () {
    const config =
      this.bud.fs.get('.eslintrc.js') ||
      this.bud.fs.get('.eslintrc.json')

    if (!this.bud.fs.exists(config)) {
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

    this.bud.hooks.on(
      'webpack.module.rules.js.use',
      (loaders: BudInterface['loaders']['repository']) => [
        ...loaders,
        this.bud.loaders.get('eslint'),
      ],
    )
  },
})

const presets = {
  roots: resolve(__dirname, './preset/roots.js'),
  wordpress: resolve(__dirname, './preset/wordpress.js'),
  react: resolve(__dirname, './preset/react.js'),
}

module.exports = {plugin, presets}
