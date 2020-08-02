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
      this.target.module.rules.push(typescript(this.bud).make())

      this.bud.logger.info(
        {name: 'webpack.rules'},
        `using ts-loader`
      )
    }

    if (this.bud.features.enabled('vue')) {
      this.target.module.rules.push(vue(this.bud).make())

      this.bud.logger.info(
        {name: 'webpack.rules'},
        `using vue-loader`
      )
    }

    if (this.bud.features.enabled('eslint')
    && !this.bud.features.enabled('typescript')) {
      this.target.module.rules.push(eslint(this.bud).make())

      this.bud.logger.info(
        {name: 'webpack.rules'},
        `using eslint-loader`
      )
    }

    if (this.bud.features.enabled('babel')) {
      this.target.module.rules.push(babel(this.bud).make())

      this.bud.logger.info(
        {name: 'webpack.rules'},
        `using babel-loader`
      )
    }

    if (this.bud.features.enabled('css')) {
      this.target.module.rules.push(css(this.bud).make())

      this.bud.logger.info(
        {name: 'webpack.rules'},
        `using css-loader`
      )
    }

    if (this.bud.features.enabled('cssModules')) {
      this.target.module.rules.push(cssModule(this.bud).make())

      this.bud.logger.info(
        {name: 'webpack.rules'},
        `supporting css modules`
      )
    }

    if (this.bud.features.enabled('scss')) {
      this.target.module.rules.push(scss(this.bud).make())

      this.bud.logger.info(
        {name: 'webpack.rules'},
        `using sass-loader`
      )
    }

    if (this.bud.features.enabled('scssModules')) {
      this.target.module.rules.push(scssModule(this.bud).make())

      this.bud.logger.info(
        {name: 'webpack.rules'},
        `supporting scss modules`
      )
    }

    if (this.bud.features.enabled('font')) {
      this.target.module.rules.push(font(this.bud).make())

      this.bud.logger.info(
        {name: 'webpack.rules'},
        `supporting font files with file-loader`
      )
    }

    if (this.bud.features.enabled('image')) {
      this.target.module.rules.push(image(this.bud).make())

      this.bud.logger.info(
        {name: 'webpack.rules'},
        `supporting image files with file-loader`
      )
    }

    if (this.bud.features.enabled('svg')) {
      this.target.module.rules.push(svg(this.bud).make())

      this.bud.logger.info(
        {name: 'webpack.rules'},
        `supporting svg files with @svgr`
      )
    }

    this.target = this.bud.hooks.filter('webpack.rules', this.target)
    return this.target
  },
})

export {rules}
