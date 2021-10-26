import {Extension} from '@roots/bud-framework'
import {safeResolve} from '@roots/bud-support'
import {VueLoaderPlugin} from 'vue-loader'
import {Configuration} from 'webpack'

/**
 * @public
 */
export const VueExtension: Extension.Module = {
  name: '@roots/bud-vue',

  boot: app => {
    const {extensions, store, hooks} = app

    if (!safeResolve('vue') || !safeResolve('@vue/compiler-sfc'))
      return

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

    extensions.add({
      name: 'vue-loader-plugin',
      make: () => new VueLoaderPlugin(),
    })

    hooks.on(
      'build/resolve/alias',
      (aliases: Configuration['resolve']['alias']) => ({
        ...aliases,
        vue: '@vue/runtime-dom',
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
