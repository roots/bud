import {Item} from '@roots/bud-build'
import type {Extension} from '@roots/bud-framework'

export const jsFeature: Extension.CompilerPlugin = {
  name: '@roots/bud-esbuild/js',

  boot: app => {
    app.build.items['esbuild-js'] = new Item({
      loader: app => app.build.loaders.esbuild,
      options: () => ({
        loader: 'jsx',
        target: 'es2015',
      }),
    })

    app.build.rules.js.setUse(app => [app.build.items['esbuild-js']])
  },
}
