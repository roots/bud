import StylelintPlugin from 'stylelint-webpack-plugin'
import type {Bud} from '@roots/bud-typings'

export const api = {
  stylelint: function (
    this: Bud,
    options: StylelintPlugin['options'],
  ): Bud {
    this.features.enable('stylelint')
    this.extensions.setOptions('@roots/bud-stylelint', options)

    return this
  },
}

export const boot = function (instance: Bud): void {
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
