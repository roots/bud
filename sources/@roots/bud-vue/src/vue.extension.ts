import {Item, Loader} from '@roots/bud-build'
import {Extension} from '@roots/bud-framework'
import {VueLoaderPlugin} from 'vue-loader'

/**
 * @public
 */
export const VueExtension: Extension.Module = {
  name: '@roots/bud-vue',

  boot: async app => {
    await app.extensions.add({
      name: 'vue-loader-plugin',
      make: () => new VueLoaderPlugin(),
    })

    app.hooks.on('build.module.rules.before', rules => [
      {
        test: app.store.get('patterns.vue'),
        use: [{loader: require.resolve('vue-loader')}],
      },
      ...(rules ?? []),
    ])

    app.hooks.on('build.resolve.extensions', extensions => {
      extensions.add('.vue')
      return extensions
    })

    app.hooks.async('build.resolve.alias', async aliases => ({
      ...(aliases ?? {}),
      vue: '@vue/runtime-dom',
    }))

    app.build.loaders['vue-style'] = new Loader(
      require.resolve('vue-style-loader'),
    )

    app.build.items['vue-style'] = new Item({
      loader: ({build}) => build.loaders['vue-style'],
    })

    const existingCssRules = app.build.rules.css.getUse()
    app.build.rules.css.setUse(({build}) => [
      build.items['vue-style'],
      ...(existingCssRules ?? []),
    ])
  },
}
