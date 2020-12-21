import StylelintPlugin from 'stylelint-webpack-plugin'
import type {Framework, Module} from '@roots/bud-typings'

export const api = {
  stylelint: function (
    this: Framework,
    options: StylelintPlugin['options'],
  ): Framework {
    this.features.set('stylelint', true)
    this.extensions
      .get('@roots/bud-stylelint')
      .setOptions(options)

    return this
  },
}

export const register: Module.Register = function (
  bud: Framework,
): void {
  bud.presets.set(
    'stylelint',
    bud.fs.path.resolve(__dirname, './preset/index.js'),
  )

  bud.when(bud.fs.get('stylelint.config.js'), () =>
    bud.features.set('stylelint', true),
  )

  bud.extensions.set('stylelint-webpack-plugin', {
    make: function (options) {
      return new StylelintPlugin(options.all())
    },
    when: function ({features}: Framework) {
      return features.enabled('stylelint')
    },
  })
}
