import {patterns} from '../util/patterns'
import {usePostCss} from '../use/usePostCss'
import {useResolveUrl} from '../use/useResolveUrl'
import {useCss} from '../use/useCss'
import {useMiniCss} from '../use/useMiniCss'

const module = bud => ({
  bud,

  name: 'webpack.module.rules.modules.css',

  rule: {
    test: patterns.cssModule,
    use: [],
  },

  make: function () {
    this.bud.hooks.call('webpack.module.rules.module.css.pre')

    this.rule.use.push(useMiniCss('webpack.rules.module.css', this.bud))
    this.rule.use.push(useCss('webpack.rules.module.css', this.bud, true))
    this.rule.use.push(useResolveUrl('webpack.rules.module.css', this.bud))

    if (this.bud.features.enabled('postCss')) {
      this.rule.use.push(usePostCss('webpack.rules.module.css', this.bud))
    }

    this.rule.use = this.bud.hooks.filter(`${this.name}.use`, this.rule.use)
    this.rule = this.bud.hooks.filter(this.name, this.rule)

    this.bud.logger.info(
      {name: 'webpack.rules.module.css', value: this.rule.test.toString()},
      `webpack.rules.module.css.test`,
    )

    this.bud.hooks.call('webpack.rules.module.css.post')

    return this.rule
  },
})

export {module}
