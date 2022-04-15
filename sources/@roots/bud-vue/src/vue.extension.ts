import {Extension} from '@roots/bud-framework'
import {VueLoaderPlugin} from 'vue-loader'

/**
 * @public
 */
export const VueExtension: Extension.Module = {
  label: '@roots/bud-vue',

  boot: async app => {
    await app.extensions.add({
      label: 'vue-loader-plugin',
      make: () => new VueLoaderPlugin(),
    })

    app.build
      .setLoader('vue', require.resolve('vue-loader'))
      .setItem('vue', item => item.setLoader('vue'))
      .setLoader('vue-style', require.resolve('vue-style-loader'))
      .setItem('vue-style', item => item.setLoader('vue-style'))

    app.build.rules.css.setUse(items => [`vue-style`, ...items])

    app.hooks.on('build.module.rules.before', rules => [
      app.build
        .makeRule()
        .setTest(app.hooks.filter('pattern.vue'))
        .setUse(items => [`vue`, ...items])
        .toWebpack(),
      ...rules,
    ])

    app.hooks.on('build.resolve.extensions', ext => ext.add('.vue'))

    app.hooks.async('build.resolve.alias', async aliases => ({
      ...(aliases ?? {}),
      vue: '@vue/runtime-dom',
    }))
  },
}
