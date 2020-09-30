import {eslintFormatter} from '@roots/bud-support'
import Bud from '@roots/bud-types'
import type {Configuration} from 'webpack'

export * as presets from './presets'

export const plugin: Bud.Plugin.Factory = (bud: Bud) => ({
  bud,

  make(): void {
    const config =
      this.bud.fs.has('.eslintrc.js') ??
      this.bud.fs.has('.eslintrc.json')

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
