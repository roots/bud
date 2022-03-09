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

    app.hooks
      .on('build.module.rules.before', rules => [
        app.build.items.vue.make(),
        ...(rules ?? []),
      ])
      .hooks.on('build.resolve.extensions', ext => ext.add('.vue'))
      .hooks.async('build.resolve.alias', async aliases => ({
        ...(aliases ?? {}),
        vue: '@vue/runtime-dom',
      }))
      .build.setLoader('vue-loader', require.resolve('vue-loader'))
      .setLoader('vue-style', require.resolve('vue-style-loader'))
      .setItem('vue', {
        test: app.store.get('patterns.vue'),
        use: [`vue-loader`],
      })
      .setItem('vue-style', {loader: app.build.loaders['vue-style']})
      .rules.css.setUse(items => [`vue-style`, ...items])
  },
}
