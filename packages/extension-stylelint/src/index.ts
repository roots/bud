import StylelintPlugin from 'stylelint-webpack-plugin'
import type {Extension} from '@roots/bud-extensions'
import type {Bud} from '@roots/bud-typings'

export const api = {
  stylelint: function (
    this: Bud,
    options: StylelintPlugin['options'],
  ): Bud {
    this.features.enable('stylelint')
    this.extensions
      .get('@roots/bud-stylelint')
      .setRepository(options)

    return this
  },
}

export const register: Extension.Register = function (
  bud: Bud,
): void {
  bud.presets.set(
    'stylelint',
    bud.fs.path.resolve(__dirname, './preset/index.js'),
  )

  bud.when(bud.fs.get('stylelint.config.js'), () =>
    bud.features.enable('stylelint'),
  )

  bud.extensions.set('stylelint-webpack-plugin', {
    make: function (options) {
      return new StylelintPlugin(options.all())
    },
    when: function ({features}: Bud) {
      return features.enabled('stylelint')
    },
  })
}
