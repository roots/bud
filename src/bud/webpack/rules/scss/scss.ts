import {patterns} from '../util/patterns'
import {usePostCss} from '../use/usePostCss'
import {useResolveUrl} from '../use/useResolveUrl'
import {useVueStyle} from '../use/useVueStyle'
import {useCss} from '../use/useCss'
import {useScss} from '../use/useScss'
import {useMiniCss} from '../use/useMiniCss'

/**
 * scss
 */
const scss = bud => ({
  bud,

  isHot: bud.features.enabled('hot'),
  isPostCss: bud.features.enabled('postCss'),

  rule: {
    test: patterns.scss,
    use: [],
    sourceMap: bud.features.enabled('map'),
  },

  make: function () {
    this.bud.hooks.call('webpack.rules.scss.pre')

    if (this.bud.features.enabled('vue')) {
      this.rule.use.push(useVueStyle('scss', this.bud))
    }

    this.rule.use.push(useMiniCss('scss', this.bud))
    this.rule.use.push(useCss('scss', this.bud))
    this.rule.use.push(useResolveUrl('scss', this.bud))

    if (this.isPostCss) {
      this.rule.use.push(usePostCss('scss', this.bud))
    }

    this.rule.use.push(useScss('module.scss', this.bud))

    this.rule = this.bud.hooks.filter('webpack.rules.scss', this.rule)

    this.bud.logger.info(
      {name: 'webpack.rules.scss', value: this.rule.test.toString()},
      `webpack.rules.scss.test`,
    )

    this.bud.hooks.call('webpack.rules.scss.post')

    return this.rule
  },
})

export {scss}
