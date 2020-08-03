import {eslint} from './js/eslint'
import {babel} from './js/babel'
import {typescript} from './js/typescript'
import {vue} from './js/vue'

import {css} from './css/css'
import {scss} from './scss/scss'
import {module as cssModule} from './css/module'
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

  target: {
    module: {
      rules: [],
    },
  },

  make: function () {
    if (this.bud.features.enabled('typescript')) {
      this.bud.logger.info({name: 'webpack.rules'}, `using ts-loader`)
      this.target.module.rules.push(typescript(this.bud).make())
    }

    if (this.bud.features.enabled('vue')) {
      this.bud.logger.info({name: 'webpack.rules'}, `supports vue`)
      this.target.module.rules.push(vue(this.bud).make())
    }

    if (
      this.bud.features.enabled('eslint') &&
      !this.bud.features.enabled('typescript')
    ) {
      this.bud.logger.info({name: 'webpack.rules'}, `supports eslint`)
      this.target.module.rules.push(eslint(this.bud).make())
    }

    if (this.bud.features.enabled('babel')) {
      this.bud.logger.info({name: 'webpack.rules'}, `supports babel`)
      this.target.module.rules.push(babel(this.bud).make())
    }

    if (this.bud.features.enabled('css')) {
      this.bud.logger.info({name: 'webpack.rules'}, `supports css`)
      this.target.module.rules.push(css(this.bud).make())
    }

    if (this.bud.features.enabled('cssModules')) {
      this.bud.logger.info({name: 'webpack.rules'}, `supports css modules`)
      this.target.module.rules.push(cssModule(this.bud).make())
    }

    if (this.bud.features.enabled('scss')) {
      this.bud.logger.info({name: 'webpack.rules'}, `supports scss`)
      this.target.module.rules.push(scss(this.bud).make())
    }

    if (this.bud.features.enabled('scssModules')) {
      this.bud.logger.info({name: 'webpack.rules'}, `supports scss modules`)
      this.target.module.rules.push(scssModule(this.bud).make())
    }

    if (this.bud.features.enabled('font')) {
      this.bud.logger.info({name: 'webpack.rules'}, `supports fonts`)
      this.target.module.rules.push(font(this.bud).make())
    }

    if (this.bud.features.enabled('image')) {
      this.bud.logger.info({name: 'webpack.rules'}, `supports images`)
      this.target.module.rules.push(image(this.bud).make())
    }

    if (this.bud.features.enabled('svg')) {
      this.bud.logger.info({name: 'webpack.rules'}, `supports svg`)
      this.target.module.rules.push(svg(this.bud).make())
    }

    this.target.entry = this.bud.hooks.filter('webpack.rules', this.target.entry)

    this.bud.logger.info(
      {name: 'webpack.rules', value: this.target},
      `webpack.rules has been generated`,
    )

    return this.target
  },
})

export {rules}
