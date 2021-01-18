import {VueLoaderPlugin} from 'vue-loader'
import {Bud} from '@roots/bud'
import {Module} from '@roots/bud-typings'

// Extension name
export const name = '@roots/bud-vue'

// Extension rulesetItem
export const setItems = {
  vue: require.resolve('vue-loader'),
  [`vue-style`]: (app: Bud) => ({
    loader: 'vue-style-loader',
  }),
}

// Extension boot
export const boot: Module.Boot = app => {
  /**
   * vue-loader-plugin doesn't recognize the rule
   * as being set if it is set as a `oneOf` rule.
   *
   * So, instead of registering the rule through the normal
   * export function this hook registers the rule in the
   * outer `webpack.module.rules` key.
   */
  app.hooks.on('webpack.module.rules', rules => [
    {
      test: app.store.get('patterns.vue'),
      use: [app.build.get('items.vue')],
    },
    ...rules,
  ])

  // Register vue-loader-plugin
  app.extensions.add('vue-loader-plugin', {
    make: () => new VueLoaderPlugin(),
  })

  // Add vue alias
  app.hooks.on('webpack.resolve.alias', aliases => ({
    ...aliases,
    vue$: 'vue/dist/vue.esm.js',
  }))

  // Add vue extension
  app.hooks.on('webpack.resolve.extensions', extensions => [
    ...extensions,
    '.vue',
  ])

  // Vue stylesheet handling
  const addStyleSupport = (rule: string): void => {
    const useItems = app.build.access(`rules.${rule}.use`)

    app.build.set(`rules.${rule}.use`, [
      app.build.access('items.vue-style'),
      ...useItems.splice(1),
    ])
  }

  // Css support
  addStyleSupport('css')
  // Sass support (where applicable)
  app.build.has('rules.sass') && addStyleSupport('sass')
}
