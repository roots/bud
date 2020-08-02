import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'
import {postCss} from '../use/postCss'
import {resolveUrl} from '../use/resolveUrl'

const css = bud => ({
  bud,
  use: [],
  test: patterns.css,
  sourceMap: bud.features.enabled('map'),

  make: function () {
    if (this.bud.features.enabled('vue')) {
      this.use.push('vue-style-loader')
    }

    this.use = [
      ...this.use,
      loaders.miniCss(this.bud.features.enabled('hot')),
      loaders.css,
      resolveUrl(this.bud).make(),
    ]

    if (this.bud.features.enabled('postCss')) {
      this.use.push({...postCss(this.bud).make()})
    }

    this.bud.hooks.call('pre_css', this)
    this.output = {
      test: this.test,
      use: this.use,
    }

    this.output = this.bud.hooks.filter('post_css', this.output)
    this.bud.logger.info(
      {name: 'webpack.rules', value: this.output.test}, `css test`
    )
    this.bud.logger.info(
      {name: 'webpack.rules', value: this.output.use}, `css use`
    )
    return this.output
  },
})

export {css}
