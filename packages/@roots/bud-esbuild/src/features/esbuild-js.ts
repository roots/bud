import type {Module, Framework} from '@roots/bud-framework'

/**
 * @const jsFeature
 * @description Use ESBuild for JS compilation
 */
export const jsFeature: Module = {
  /**
   * @property jsFeature.name
   * @description extension identifier
   */
  name: '@roots/bud-esbuild/js',

  /**
   * @property jsFeature.boot
   * @description code to be run on extension boot event
   */
  boot: ({hooks, publish, subscribe}: Framework) => {
    hooks.on(
      'loader/esbuild-js',
      require.resolve('esbuild-loader'),
    )

    hooks.on('rule/js/use', subscribe('item/esbuild-js'))

    publish({
      'item/esbuild-js': () => ({
        loader: subscribe('loader/esbuild-js'),
        options: {
          loader: subscribe('item/esbuild-js/options/loader'),
          target: subscribe('item/esbuild-js/options/target'),
        },
      }),
      'item/esbuild-js/options/loader': () => 'jsx',
      'item/esbuild-js/options/target': () => 'es2015',
    })
  },
}
