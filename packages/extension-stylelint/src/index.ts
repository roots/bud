import StylelintPlugin from 'stylelint-webpack-plugin'
import type {Framework, Module} from '@roots/bud-typings'

export const api = {
  stylelint: function (
    this: Framework,
    options: StylelintPlugin['options'],
  ): Framework {
    this.store.set('features.stylelint', true)
    this.extensions.set('@roots/bud-stylelint.options', options)

    return this
  },
}

export const register: Module.Register = function (
  bud: Framework,
): void {
  bud.store.set(
    'presets.stylelint',
    bud.disk
      .get('project')
      .path.resolve(__dirname, './preset/index.js'),
  )

  bud.when(
    bud.disk.get('project').get('stylelint.config.js'),
    () => bud.store.set('features.stylelint', true),
  )

  bud.extensions.set('stylelint-webpack-plugin', {
    make: function (options) {
      return new StylelintPlugin(options.all())
    },
    when: function ({store}: Framework) {
      return store.enabled('features.stylelint')
    },
  })
}
