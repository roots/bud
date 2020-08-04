import {patterns} from '../util/patterns'
import {usePostCss} from '../use/usePostCss'
import {useResolveUrl} from '../use/useResolveUrl'
import {useVueStyle} from '../use/useVueStyle'
import {useCss} from '../use/useCss'
import {useMiniCss} from '../use/useMiniCss'

const module = bud => ({
  bud,

  isHot: bud.features.enabled('hot'),

  rule: {
    test: patterns.cssModule,
    use: [],
  },

  make: function () {
    this.bud.hooks.call('webpack.rules.module.css.pre')

    if (this.bud.features.enabled('vue')) {
      this.rule.use.push(useVueStyle('webpack.rules.module.css', this.bud))
    }

    this.rule.use.push(useMiniCss('webpack.rules.module.css', this.bud))
    this.rule.use.push(useCss('webpack.rules.module.css', this.bud, true))
    this.rule.use.push(useResolveUrl('webpack.rules.module.css', this.bud))

    if (this.bud.features.enabled('postCss')) {
      this.rule.use.push(usePostCss('webpack.rules.module.css', this.bud))
    }

    this.rule = this.bud.hooks.filter('webpack.rules.module.css', this.rule)

    this.bud.logger.info(
      {name: 'webpack.rules.module.css', value: this.rule.test.toString()},
      `webpack.rules.module.css.test`,
    )

    this.bud.hooks.call('webpack.rules.module.css.post')

    return this.rule
  },
})

export {module}
