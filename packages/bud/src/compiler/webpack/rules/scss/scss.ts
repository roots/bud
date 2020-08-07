import {patterns} from '../util/patterns'
import {usePostCss} from '../use/usePostCss'
import {useResolveUrl} from '../use/useResolveUrl'
import {useCss} from '../use/useCss'
import {useScss} from '../use/useScss'
import {useMiniCss} from '../use/useMiniCss'

const scss = bud => ({
  bud,

  name: 'webpack.module.rules.scss',

  isPostCss: bud.features.enabled('postCss'),

  rule: {
    test: patterns.scss,
    use: [],
  },

  make: function () {
    this.bud.hooks.call(`${this.name}.pre`)

    this.rule.use.push(useMiniCss(this.name, this.bud))
    this.rule.use.push(useCss(this.name, this.bud))
    this.rule.use.push(useResolveUrl(this.name, this.bud))

    if (this.isPostCss) {
      this.rule.use.push(usePostCss(this.name, this.bud))
    }

    this.rule.use.push(useScss(this.name, this.bud))

    this.rule.use = this.bud.hooks.filter(`${this.name}.use`, this.rule.use)
    this.rule = this.bud.hooks.filter(this.name, this.rule)

    this.bud.logger.info(
      {name: this.name, value: this.rule.test.toString()},
      `webpack.rules.scss.test`,
    )

    this.bud.hooks.call(`${this.name}.post`)

    return this.rule
  },
})

export {scss}
