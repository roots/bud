import StylelintPlugin from 'stylelint-webpack-plugin'

export const registerApi = {
  stylelint: function (
    this: Framework.Bud,
    options: StylelintPlugin['options'],
  ): Framework.Bud {
    this.features.enable('stylelint')
    this.extensions.setOptions('@roots/bud-stylelint', options)

    return this
  },
}

export const boot = function (instance: Framework.Bud): void {
  instance.presets.set(
    'stylelint',
    instance.fs.path.resolve(__dirname, './preset/index.js'),
  )

  instance.when(instance.fs.get('stylelint.config.js'), () =>
    instance.features.enable('stylelint'),
  )

  instance.extensions.register('stylelint-webpack-plugin', {
    make: function () {
      return new StylelintPlugin(
        instance.extensions.getOptions('@roots/bud-stylelint'),
      )
    },

    when: function () {
      return instance.features.enabled('stylelint')
    },
  })
}
