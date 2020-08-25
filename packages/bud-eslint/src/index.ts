import type {Bud, Extension, ExtensionInterface} from '@roots/bud'
import presets from './preset'
import {join, resolve} from 'path'

const rule = (bud: Bud) => ({
  enforce: 'pre',
  test: bud.patterns.get('js'),
  exclude: bud.patterns.get('vendor'),
  use: [
    {
      loader: require.resolve('eslint-loader'),
      options: {
        configFile: bud.configs.get('eslint'),
        formatter: 'codeframe',
        failOnError: true,
      },
    },
  ],
})

const eslint: Extension = (bud: Bud): ExtensionInterface => ({
  bud,
  name: 'eslint',
  make: function (this: ExtensionInterface) {
    const config = join(this.bud.project('.eslintrc.js'))
    if (!this.bud.fs.existsSync(config)) {
      return
    }

    this.bud.configs.set('eslint', config)
    this.bud.features.set('eslint', true)
    this.bud.rules.push(rule)
  },
})

const preset = {
  roots: resolve(__dirname, './preset/roots.js'),
  wordpress: resolve(__dirname, './preset/wordpress.js'),
  react: resolve(__dirname, './preset/react.js'),
}

export {eslint}
export {preset}
export {presets}
