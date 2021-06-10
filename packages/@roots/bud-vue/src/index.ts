import './interface'
import {VueLoaderPlugin} from 'vue-loader'
import {Configuration} from 'webpack'
import {Module} from '@roots/bud-framework'
import {Loader, Item} from '@roots/bud-build'

const extension: Module = {
  name: '@roots/bud-vue',

  boot: app => {
    const {build, discovery, extensions, store, hooks} = app
    if (!discovery.hasPeerDependency('vue')) return

    build.loaders['vue-style'] = new Loader(
      require.resolve('vue-style-loader'),
    )

    build.items['vue-style'] = new Item({
      loader: ({build}) => build.loaders['vue-style'],
    })

    hooks.on(
      'build/module/rules',
      (rules: Configuration['module']['rules']) => [
        {
          test: store.get('patterns.vue'),
          use: [{loader: require.resolve('vue-loader')}],
        },
        ...rules,
      ],
    )

    const cssItems = build.rules['css'].getUse(app)
    build.rules['css'].setUse(({isProduction, build}) => [
      isProduction
        ? build.items['minicss']
        : build.items['vue-style'],
      ...cssItems.splice(1),
    ])

    if (app.build.rules['sass']) {
      const sassItems = app.build.rules['sass'].getUse(app)
      build.rules['css'].setUse(({isProduction, build}) => [
        isProduction
          ? build.items['minicss']
          : build.items['vue-style'],
        ...sassItems.splice(1),
      ])
    }

    extensions.add({
      name: 'vue-loader-plugin',
      make: () => new VueLoaderPlugin(),
    })

    hooks.on(
      'build/resolve/alias',
      (aliases: Configuration['resolve']['alias']) => ({
        ...aliases,
        vue$: 'vue/dist/vue.esm.js',
      }),
    )

    hooks.on(
      'build/resolve/extensions',
      (extensions: Configuration['resolve']['extensions']) => [
        ...extensions,
        '.vue',
      ],
    )
  },
}

export default extension
export const {name, boot} = extension
