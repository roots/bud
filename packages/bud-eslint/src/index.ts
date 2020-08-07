import presets from './preset'
import {join, resolve } from 'path'

type Eslint = () => any

const rule: Function = (bud: any): any => ({
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

const eslint: Eslint = () => ({
  make: function () {
    /**
     * Load .eslintrc.js and bail early if not found.
     */
    const config = join(this.bud.project('.eslintrc.js'))
    if (!this.bud.fs.existsSync(config)) {
      return
    }

    /**
     * Set eslintrc to config container
     */
    this.bud.configs.set('eslint', config)

    /**
     * Enable eslint support
     */
    this.bud.features.set('eslint', true)

    /**
     * Add eslint rule to webpack modules repository.
     */
    this.bud.rules.repository = [
      bud => rule(bud),
      ...this.bud.rules.repository,
    ]
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
