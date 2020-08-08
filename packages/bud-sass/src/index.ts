import {config} from './api'
import loaders from './loaders'

/**
 * Sass webpack module rule.
 */
const rule: (bud: any) => any = (bud: any): any => ({
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

const sass = () => ({
  make: function (this: any) {
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
      (bud: any) => rule(bud),
    ]
  },
})

export = sass
