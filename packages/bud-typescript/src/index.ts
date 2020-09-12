const typescript = bud => ({
  bud,

  make: function () {
    this.bud.addExtensions(['ts', 'tsx'])

    this.bud.patterns.set('typescript', /\.(ts|tsx)$/)
    this.bud.loaders.set(
      'typescript',
      require.resolve('ts-loader'),
    )

    this.bud.uses.set('typescript', bud => ({
      loader: this.bud.loaders.get('typescript'),
      options: {
        configFile: this.bud.project('tsconfig.json'),
      },
    }))

    this.bud.rules.set('typescript', bud => ({
      test: bud.patterns.get('typescript'),
      exclude: bud.patterns.get('modules'),
      use: [bud.uses.get('typescript')],
    }))

    this.bud.apply('typescript', function (options) {
      options.configFile &&
        this.configs.set('typescript', options.configFile)

      this.options.merge('typescript', options)

      return this
    })
  },
})

module.exports = typescript
