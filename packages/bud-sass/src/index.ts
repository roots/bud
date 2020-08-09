import {config} from './api'
import loaders from './loaders'
import {Bud, Extension, Rule} from '@roots/bud'

declare const bud: Bud

/**
 * Sass webpack module rule.
 *
 * @type {Rule}
 */
const rule: Rule = (bud: Bud) => ({
  test: /\.s(c|a)ss$/,
  exclude: bud.patterns.get('vendor'),
  use: [
    loaders.miniCss(bud),
    loaders.css(bud),
    loaders.resolveUrl(bud),
    loaders.postCss(bud),
    loaders.sass(bud),
  ],
})

/**
 * Bud extension: sass
 *
 * Adds sass support to the Bud framework.
 *
 * @type {Extension}
 */
const sass: Extension = () => ({
  make: function () {
    if (this.bud) {
      /**
       * Enable sass support
       */
      this.bud.features.set('sass', true)

      /**
       * Add bud.sass method.
       */
      this.bud.sass = config

      /**
       * Add sass rule to webpack modules repository.
       */
      this.bud.rules.repository = [
        ...this.bud.rules.repository,
        (bud: Bud) => rule(bud),
      ]
    }
  },
})

export = sass
