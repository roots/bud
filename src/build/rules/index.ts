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
          eslint(this.bud).make(),
          babel(this.bud).make(),
          typescript(this.bud).make(),
          css(this.bud).make(),
          cssModule(this.bud).make(),
          scss(this.bud).make(),
          scssModule(this.bud).make(),
          font(this.bud).make(),
          image(this.bud).make(),
          svg(this.bud).make(),
        ],
      },
    }

    this.output.module.rules = this.output.module.rules.filter(
      (type: any) => type !== null,
    )

    return this.output
  },
})

export {rules}
