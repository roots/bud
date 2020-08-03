import {patterns} from '../util/patterns'
import {usePostCss} from '../use/usePostCss'
import {useResolveUrl} from '../use/useResolveUrl'
import {useVueStyle} from '../use/useVueStyle'
import {useCss} from '../use/useCss'
import {useMiniCss} from '../use/useMiniCss'

const css = bud => ({
  bud,

  isHot: bud.features.enabled('hot'),

  rule: {
    test: patterns.css,
    use: [],
    sourceMap: bud.features.enabled('map'),
  },

  make: function () {
    this.bud.hooks.call('webpack.rules.css.pre')

    if (this.bud.features.enabled('vue')) {
      this.rule.use.push(useVueStyle('css', this.bud))
    }

    this.rule.use.push(useMiniCss('css', this.bud))
    this.rule.use.push(useCss('css', this.bud))
    this.rule.use.push(useResolveUrl('css', this.bud))

    if (this.bud.features.enabled('postCss')) {
      this.rule.use.push(usePostCss('css', this.bud))
    }

    this.rule = this.bud.hooks.filter('webpack.rules.css', this.rule)

    this.bud.logger.info(
      {name: 'webpack.rules.css', value: this.rule.test.toString()},
      `webpack.rules.css.test`,
    )

    this.bud.hooks.call('webpack.rules.css.post')

    return this.rule
  },
})

export {css}
