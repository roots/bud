import './interface'
import {VueLoaderPlugin} from 'vue-loader'
import Webpack from 'webpack'
import {Module} from '@roots/bud-extensions'

/**
 * Name
 */
export const name: Module['name'] = '@roots/bud-vue'

export const boot: Module['boot'] = app => {
  app.build.loader.set('vue', require.resolve('vue-loader'))
  app.build.loader.set(
    'vue-style',
    require.resolve('vue-style-loader'),
  )

  app.publish({
    'item/vue': () => ({
      loader: app.build.loader.get('vue'),
    }),
    'item/vue-style': () => ({
      loader: app.build.loader.get('vue-style'),
    }),

    'rule/vue': () => ({
      test: app.subscribe('rule/vue/test'),
      use: app.subscribe('rule/vue/use'),
    }),

    'rule/vue/test': () => app.store.get('patterns.vue'),
    'rule/vue/use': () => [app.subscribe('item/vue')],

    'build/module/rules': (
      rules: Webpack.Configuration['module']['rules'],
    ) => [app.subscribe('rule/vue'), ...rules],

    'rule/css/use': use => [
      app.isProduction
        ? app.subscribe('item/minicss')
        : app.subscribe('item/vue-style'),
      ...use.splice(1),
    ],

    'build/resolve/alias': (
      aliases: Webpack.Configuration['resolve']['alias'],
    ) => ({
      ...aliases,
      vue$: 'vue/dist/vue.esm.js',
    }),

    'build/resolve/extensions': (
      extensions: Webpack.Configuration['resolve']['extensions'],
    ) => [...extensions, '.vue'],
  })

  app.extensions.add({
    name: 'vue-loader-plugin',
    make: () => new VueLoaderPlugin(),
  })

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

const extension: Module = {
  name,
  boot,
}

export default extension
