import {eslint} from './js/eslint'
import {babel} from './js/babel'
import {typescript} from './js/typescript'

import {css} from './css/css'
import {module as cssModule} from './css/module'
import {scss} from './scss/scss'
import {module as scssModule} from './scss/module'

import {font} from './font'
import {image} from './image'
import {svg} from './svg'

/**
 * Webpack loaders
 * @type {function} rules
 */
const rules = bud => ({
  bud,

  output: {},
  options: {
    module: {
      strictExportPresence: true,
    },
  },

  /**
   * Make webpack rules
   */
  make: function () {
    this.output = {
      ...this.options,
      module: {
        ...this.options.module,
        rules: [
          eslint(this).make(),
          babel(this).make(),
          typescript(this).make(),
          css(this).make(),
          cssModule(this).make(),
          scss(this).make(),
          scssModule(this).make(),
          font(this).make(),
          image(this).make(),
          svg(this).make(),
        ],
      },
    }

    this.output.module.rules = this.output.module.rules.filter(
      (type: any) => type !== null,
    )

    return this.output
  },

  /**
   * Hook: pre_modules
   */
  preHook: function () {
    this.bud.hooks.call('pre_module', this)
  },

  /**
   * Hook post_modules
   */
  postHook: function () {
    this.bud.hooks.call('post_module', this.output)
  },
})

export {rules}
