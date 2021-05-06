import type {Module, Framework} from '@roots/bud-framework'
import {Item, Loader, Rule} from '@roots/bud-build'

export const tsFeature: Module = {
  name: '@roots/bud-esbuild/ts',

  boot: ({build, hooks}: Framework) => {
    build.loaders.esbuild = new Loader(app =>
      require.resolve('esbuild-loader'),
    )

    build.items['esbuild-ts'] = new Item({
      loader: app => app.build.loaders.esbuild,
      options: app => ({
        loader: 'tsx',
        target: 'es2015',
        tsconfigRaw: app.disk.get('project').has('tsconfig.json')
          ? app.disk.get('project').readJson('tsconfig.json')
          : {
              compilerOptions: {
                importsNotUsedAsValues: 'remove',
              },
            },
      }),
    })

    build.rules.ts = new Rule({
      test: app => app.store.get('patterns.ts'),
      exclude: app => app.store.get('patterns.modules'),
      use: app => [app.build.items['esbuild-ts']],
    })

    hooks.on(
      'build/resolve/extensions',
      (exts: string & `.${string}`) => ['.ts', '.tsx', ...exts],
    )
  },
}
