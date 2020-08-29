import type {Bud} from '@roots/bud'
import {Plugin, PluginInterface} from '@roots/bud-framework'
import {join, resolve} from 'path'

const eslint: Plugin = (bud: Bud) => ({
  bud,

  make: function (this: PluginInterface) {
    const config = join(this.bud.project('.eslintrc.js'))

    if (!this.bud.fs.existsSync(config)) {
      return
    }

    this.bud.configs.set('eslint', config)

    this.bud.features.set('eslint', true)

    this.bud.uses.set('eslint', (bud: Bud) => ({
      loader: require.resolve('eslint-loader'),
      options: {
        configFile: bud.configs.get('eslint'),
        formatter: 'codeframe',
        failOnError: true,
      },
    }))

    this.bud.hooks.filter('webpack.module.rules.js.use', ({use, bud}) => [
      bud.uses.get('babel'),
      bud.uses.get('eslint'),
    ])
  },
})

const preset = {
  roots: resolve(__dirname, './preset/roots.js'),
  wordpress: resolve(__dirname, './preset/wordpress.js'),
  react: resolve(__dirname, './preset/react.js'),
}

export {
  eslint,
  preset,
}
