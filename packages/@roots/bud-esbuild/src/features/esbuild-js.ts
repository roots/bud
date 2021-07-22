import {Item, Loader} from '@roots/bud-build'
import type {Module} from '@roots/bud-framework'

/**
 * @const jsFeature
 * @description Use ESBuild for JS compilation
 */
export const jsFeature: Module = {
  name: '@roots/bud-esbuild/js',
  boot: app => {
    app.build.loaders.esbuild = new Loader(app =>
      require.resolve('esbuild-loader'),
    )
    app.build.items['esbuild-js'] = new Item({
      loader: app => app.build.loaders.esbuild,
      options: () => ({
        loader: 'jsx',
        target: 'es2015',
      }),
    })

    app.build.rules.js.setUse(app => [
      app.build.items['esbuild-js'],
    ])
  },
}
