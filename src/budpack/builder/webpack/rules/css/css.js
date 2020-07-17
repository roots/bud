import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'
import {postCss} from '../use/postCss'

/**
 * Css
 * @typedef {function} css
 * @return {object}
 */
const css = builder => ({
  builder,
  test: patterns.css,
  sourceMap: builder.bud.features.map,

  make: function () {
    this.use = [
      loaders.miniCss,
      loaders.css,
      {
        loader: loaders.resolveUrl,
        options: {
          sourceMap: this.builder.bud.features.map,
          debug: true,
        },
      },
      {...postCss(this.builder).make()},
    ]

    this.builder.bud.hooks.call('pre_css', this)
    this.output = {
      test: this.test,
      use: this.use,
    }

    this.builder.bud.hooks.call('post_css', ({
      output: this.output,
    }))

    return this.output
  },
})

export {css}
