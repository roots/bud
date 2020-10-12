import Bud from '@roots/bud-types'
import {LoaderOptions} from 'ts-loader/dist/interfaces'
import * as rule from './rule'

/**
 * ## bud.typescript
 * @see {ts-loader} for configuration options
 */
const configFunction = function (options: LoaderOptions) {
  if (options.configFile) {
    this.configs.set('typescript', options.configFile)
  }

  this.options.merge('typescript', options)

  return this
}

const TypescriptSupport: Bud.Plugin.Factory = (bud: Bud) => ({
  bud,

  make: function (this: Bud.Plugin.Extension) {
    this.bud.addExtensions(['ts', 'tsx'])

    this.bud.store['pattterns'].set('typescript', /\.(ts|tsx)$/)

    this.bud.build.loaders.typescript = require.resolve('ts-loader')

    this.bud.build.items.typescript = {
      loader: this.bud.store['loaders'].get('typescript'),
      options: {
        configFile: this.bud.fs.resolve('tsconfig.json'),
      },
    }

    this.bud.build.rules.typescript = rule

    /**
     * Add typescript config function to Bud.Config
     */
    this.bud.apply('typescript', configFunction)
  },
})

module.exports = TypescriptSupport
