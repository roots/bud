import {VueLoaderPlugin} from 'vue-loader'
import {Module, Webpack} from '@roots/bud-typings'

/**
 * Name
 */
export const name: Module['name'] = '@roots/bud-vue'

/**
 * Dependencies
 */
export const dependencies: Module['dependencies'] = ['vue']
export const devDependencies: Module['devDependencies'] = [
  'vue-loader',
]

/**
 * Publish
 */
export const publish = app => ({
  /**
   * loader/vue
   */
  'loader/vue': () => require.resolve('vue-loader'),
  'loader/vue-style': () => require.resolve('vue-style-loader'),

  /**
   * item/vue
   */
  'item/vue': () => ({
    loader: app.subscribe('loader/vue'),
  }),
  'item/vue-style': () => ({
    loader: app.subscribe('loader/vue-style'),
  }),

  /**
   * rule/vue
   */
  'rule/vue': () => ({
    test: app.subscribe('rule/vue/test'),
    use: app.subscribe('rule/vue/use'),
  }),
  'rule/vue/test': () => app.store.get('patterns.vue'),
  'rule/vue/use': () => [app.subscribe('item/vue')],

  /**
   * build/module/rules
   */
  'build/module/rules': (
    rules: Webpack.Configuration['module']['rules'],
  ) => [app.subscribe('rule/vue'), ...rules],

  'rule/css/use': use => [
    app.isProduction
      ? app.subscribe('item/minicss')
      : app.subscribe('item/vue-style'),
    ...use.splice(1),
  ],

  /**
   * vue alias
   */
  'build/resolve/alias': (
    aliases: Webpack.Configuration['resolve']['alias'],
  ) => ({
    ...aliases,
    vue$: 'vue/dist/vue.esm.js',
  }),

  /**
   * vue extension
   */
  'build/resolve/extensions': (
    extensions: Webpack.Configuration['resolve']['extensions'],
  ) => [...extensions, '.vue'],
})

/**
 * Boot extension
 */
export const boot: Module['boot'] = app => {
  /**
   * Add vue-loader-plugin
   */
  app.extensions.add({
    name: 'vue-loader-plugin',
    make: () => new VueLoaderPlugin(),
  })

  /**
   * Add sass handling if in use
   */
  app.subscribe('rule/sass') &&
    app.publish({
      'rule/sass/use': use => [
        app.isProduction
          ? app.subscribe('item/minicss')
          : app.subscribe('item/vue-style'),
        ...use.splice(1),
      ],
    })
}
