import {patterns} from './util/patterns'
import {useFile} from './use/useFile'

const font = bud => ({
  bud,

  name: 'webpack.rules.font',

  rule: {
    test: patterns.font,
    use: [{...useFile('webpack.rules.font', bud)}],
  },

  make: function () {
    this.rule.use = this.bud.hooks.filter(`${this.name}.use`, this.rule.use)
    this.rule.test = this.bud.hooks.filter(`${this.name}.test`, this.rule.test)
    this.rule = this.bud.hooks.filter(`${this.name}.filter`, this.rule)

    this.bud.logger.info(
      {
        name: this.name,
        value: this.rule.test.toString(),
      },
      `test`,
    )

    this.bud.logger.info(
      {
        name: this.name,
        value: this.rule.use.map(item => item.loader),
      },
      `use`,
    )

    return this.rule
  },
})

export {font}
