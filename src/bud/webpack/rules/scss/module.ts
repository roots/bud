import {patterns} from '../util/patterns'
import {usePostCss} from '../use/usePostCss'
import {useResolveUrl} from '../use/useResolveUrl'
import {useVueStyle} from '../use/useVueStyle'
import {useCss} from '../use/useCss'
import {useScss} from '../use/useScss'
import {useMiniCss} from '../use/useMiniCss'
import {useStyle} from '../use/useStyle'

const module = bud => ({
  bud,

  name: 'webpack.rules.modulescss',

  isHot: bud.features.enabled('hot'),
  isPostCss: bud.features.enabled('postCss'),

  rule: {
    test: patterns.scssModule,
    use: [],
  },

  make: function () {
    this.bud.hooks.call('webpack.rules.module.scss.pre')

    if (this.bud.features.enabled('vue')) {
      this.rule.use.push(useVueStyle(this.name, this.bud))
    }

    this.rule.use.push(useMiniCss(this.name, this.bud))
    this.rule.use.push(useCss(this.name, this.bud, true))
    this.rule.use.push(useResolveUrl(this.name, this.bud))

    if (this.isPostCss) {
      this.rule.use.push(usePostCss(this.name, this.bud))
    }

    this.rule.use.push(useScss(this.name, this.bud))

    this.rule = this.bud.hooks.filter(this.name, this.rule)

    this.bud.logger.info(
      {name: this.name, value: this.rule.test.toString()},
      `webpack.rules.module.scss.test`,
    )

    this.bud.hooks.call('webpack.rules.module.scss.post')

    return this.rule
  },
})

export {module}
