import {patterns} from '../util/patterns'
import {usePostCss} from '../use/usePostCss'
import {useResolveUrl} from '../use/useResolveUrl'
import {useVueStyle} from '../use/useVueStyle'
import {useCss} from '../use/useCss'
import {useMiniCss} from '../use/useMiniCss'

const css = bud => ({
  bud,

  name: 'webpack.rules.css',

  rule: {
    test: patterns.css,
    use: [],
  },

  make: function () {
    this.bud.hooks.call('webpack.rules.css.pre')

    if (this.bud.features.enabled('vue')) {
      this.rule.use.push({...useVueStyle(this.name, this.bud)})
    }

    this.rule.use.push(useMiniCss(this.name, this.bud))
    this.rule.use.push(useCss(this.name, this.bud))
    this.rule.use.push(useResolveUrl(this.name, this.bud))

    if (this.bud.features.enabled('postCss')) {
      this.rule.use.push(usePostCss(this.name, this.bud))
    }

    this.rule = this.bud.hooks.filter(this.name, this.rule)

    this.bud.logger.info(
      {name: this.name, value: this.rule.test.toString()},
      `webpack.rules.css.test`,
    )

    this.bud.hooks.call('webpack.rules.css.post')

    return this.rule
  },
})

export {css}
