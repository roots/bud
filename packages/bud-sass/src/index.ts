import {config} from './api'
import use from './use'
import {Bud, Extension, ExtensionInterface} from '@roots/bud'

/**
 * Sass webpack module rule.
 *
 * @type {Rule}
 */
const rule = (bud: Bud) => ({
  test: /\.s(c|a)ss$/,
  exclude: bud.patterns.get('vendor'),
  use: [
    bud.uses.get('miniCss')(bud),
    bud.uses.get('css')(bud),
    bud.uses.get('resolveUrl')(bud),
    bud.uses.get('postCss')(bud),
    use(bud),
  ],
})

/**
 * Bud extension: sass
 *
 * Adds sass support to the Bud framework.
 *
 * @type {Extension}
 */
const sass: Extension = (bud: Bud): ExtensionInterface => ({
  bud,

  name: 'sass',

  make: function () {
    !this.bud.options.get('resolve.extensions').includes('.sass') &&
      this.bud.options.set('resolve.extensions', [
        ...this.bud.options.get('resolve.extensions'),
        '.sass',
      ])

    !this.bud.options.get('resolve.extensions').includes('.scss') &&
      this.bud.options.set('resolve.extensions', [
        ...this.bud.options.get('resolve.extensions'),
        '.scss',
      ])

    this.bud.apply('sass', config)

    this.bud.rules.repository = [...this.bud.rules.repository, rule]
  },
})

export {sass}
