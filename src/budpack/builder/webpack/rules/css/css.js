import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'
import {postCss} from '../use/postCss'
import {resolveUrl} from './../use/resolveUrl'

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
      resolveUrl(this.builder).make(),
      {...postCss(this.builder).make()},
    ]

    this.builder.bud.hooks.call('pre_css', this)
    this.output = {
      test: this.test,
      use: this.use,
    }

    this.builder.bud.hooks.call('post_css', {
      output: this.output,
    })

    return this.output
  },
})

export {css}
