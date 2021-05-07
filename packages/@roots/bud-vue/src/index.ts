import './interface'
import {VueLoaderPlugin} from 'vue-loader'
import Webpack from 'webpack'
import {Module} from '@roots/bud-extensions'
import {Loader, Item, Rule} from '@roots/bud-build'

const extension: Module = {
  name: '@roots/bud-vue',
  boot: app => {
    const {build, extensions, hooks} = app

    build.loaders['vue'] = new Loader(app =>
      require.resolve('vue-loader'),
    )
    build.loaders['vue-style'] = new Loader(app =>
      require.resolve('vue-style-loader'),
    )
    extensions.add({
      name: 'vue-loader-plugin',
      make: () => new VueLoaderPlugin(),
    })

    build.items['vue'] = new Item({
      loader: ({build}) => build.loaders['vue'],
    })
    build.items['vue-style'] = new Item({
      loader: ({build}) => build.loaders['vue-style'],
    })

    build.rules['vue'] = new Rule({
      test: ({store}) => store.get('patterns.vue'),
      use: ({build}) => [build.items['vue']],
    })

    const cssItems = build.rules['css'].getUse(app)
    build.rules['css'].setUse(({isProduction, build}) => [
      isProduction
        ? build.items['minicss']
        : build.items['vue-style'],
      ...cssItems.splice(1),
    ])

    const sass = app.build.rules['sass']
    if (sass) {
      const sassItems = sass.getUse(app)
      build.rules['css'].setUse(({isProduction, build}) => [
        isProduction
          ? build.items['minicss']
          : build.items['vue-style'],
        ...sassItems.splice(1),
      ])
    }

    hooks.on(
      'build/resolve/alias',
      (aliases: Webpack.Configuration['resolve']['alias']) => ({
        ...aliases,
        vue$: 'vue/dist/vue.esm.js',
      }),
    )

    hooks.on(
      'build/resolve/extensions',
      (
        extensions: Webpack.Configuration['resolve']['extensions'],
      ) => [...extensions, '.vue'],
    )
  },
}

export default extension
export const {name, boot} = extension
