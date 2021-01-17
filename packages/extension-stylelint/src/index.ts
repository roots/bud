import StylelintPlugin from 'stylelint-webpack-plugin'
import type {
  Container,
  Framework,
  Module,
} from '@roots/bud-typings'

export const api = {
  stylelint: function (
    this: Framework,
    options: StylelintPlugin['options'],
  ): Framework {
    this.options.set('stylelint', true)
    this.extensions.set('@roots/bud-stylelint.options', options)

    return this
  },
}

export const register: Module.Register = function ({
  disk,
  store,
  options,
  extensions,
}: Framework): void {
  store.set(
    'presets.stylelint',
    disk
      .get('project')
      .path.resolve(__dirname, './preset/index.js'),
  )

  disk.get('project').has('stylelint.config.js') &&
    options.set('stylelint', true)

  extensions.add('stylelint-webpack-plugin', {
    options: {},
    make: function (
      options: Container<StylelintPlugin['options']>,
    ) {
      return new StylelintPlugin(options.all())
    },
    when: function ({options}: Framework) {
      return options.enabled('stylelint')
    },
  })
}
