import {Item, Loader} from '@roots/bud-build'
import {Extension} from '@roots/bud-framework'
import {VueLoaderPlugin} from 'vue-loader'
import {Configuration} from 'webpack'

/**
 * @public
 */
export const VueExtension: Extension.Module = {
  name: '@roots/bud-vue',

  boot: async app => {
    const {
      build: {loaders, items, rules},
      use,
      store,
      hooks,
    } = app

    await use({
      name: 'vue-loader-plugin',
      make: () => new VueLoaderPlugin(),
    })

    hooks.on<'build.module.rules.before'>(
      'build.module.rules.before',
      rules => [
        {
          test: store.get('patterns.vue'),
          use: [{loader: require.resolve('vue-loader')}],
        },
        ...(rules ?? []),
      ],
    )

    hooks.on<'build.resolve.alias'>('build.resolve.alias', aliases => ({
      ...(aliases ?? {}),
      vue: '@vue/runtime-dom',
    }))

    hooks.on<'build.resolve.extensions'>(
      'build.resolve.extensions',
      (extensions: Configuration['resolve']['extensions']) => [
        ...extensions,
        '.vue',
      ],
    )

    loaders['vue-style'] = new Loader(require.resolve('vue-style-loader'))
    items['vue-style'] = new Item({
      loader: ({build}) => build.loaders['vue-style'],
    })

    const existingCssRules = rules.css.getUse()
    rules.css.setUse(({build}) => [
      build.items['vue-style'],
      ...(existingCssRules ?? []),
    ])
  },
}
