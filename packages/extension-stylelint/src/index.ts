import StylelintPlugin from 'stylelint-webpack-plugin'
import type {Bud, Extension} from '@roots/bud-typings'

export const api = {
  stylelint: function (
    this: Bud.Contract,
    options: StylelintPlugin['options'],
  ): Bud.Contract {
    this.features.set('stylelint', true)
    this.extensions
      .get('@roots/bud-stylelint')
      .setOptions(options)

    return this
  },
}

export const register: Extension.Register = function (
  bud: Bud.Contract,
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
    when: function ({features}: Bud.Contract) {
      return features.enabled('stylelint')
    },
  })
}
