import {BudInterface, Plugin, PluginInterface} from '@roots/bud'
import type {Configuration} from 'webpack'

import {resolve} from 'path'
import {eslintFormatter} from '@roots/bud-support'

export const plugin: Plugin = (
  bud: BudInterface,
): PluginInterface => ({
  bud,

  make: function () {
    const config =
      this.bud.fs.get('.eslintrc.js') ??
      this.bud.fs.get('.eslintrc.json')

    if (!this.bud.fs.existsSync(config)) {
      return
    }

    this.bud.features.set('eslint', true)

    this.bud.loaders.set('eslint', {
      loader: require.resolve('eslint-loader'),
      options: {
        configFile: this.bud.fs.get('eslint'),
        formatter: eslintFormatter,
        failOnError: true,
        fix: this.bud.args.get('fix') ?? false,
      },
    })

    this.bud.hooks.on(
      'webpack.module.rules.js.use',
      (loaders: Configuration['module']['rules']) => [
        ...loaders,
        this.bud.loaders.get('eslint'),
      ],
    )
  },
})

export const presets = {
  roots: resolve(__dirname, './preset/roots.js'),
  wordpress: resolve(__dirname, './preset/wordpress.js'),
  react: resolve(__dirname, './preset/react.js'),
}
