/**
 * Webpack loaders
 */
const rules = bud => ({
  bud,

  target: {
    module: {
      rules: [],
    },
  },

  make: function () {
    this.bud.rules.repository.forEach(rule => {
      this.target.module.rules.push(rule(this.bud))
    })

    this.target.module.rules = this.bud.hooks.filter(
      'webpack.module.rules',
      this.target.module.rules,
    )

    this.bud.logger.info(
      {name: 'webpack.rules', value: this.target},
      `webpack.rules has been generated`,
    )

    return this.target
  },
})

export {rules}
