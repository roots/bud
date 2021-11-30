import {Item, Rule} from '@roots/bud-build'
import type {Extension, Framework} from '@roots/bud-framework'
import {pathExistsSync, readJson} from 'fs-extra'

export const tsFeature: Extension.CompilerPlugin = {
  name: '@roots/bud-esbuild/ts',

  boot: ({build, hooks}: Framework) => {
    build.items['esbuild-ts'] = new Item({
      loader: ({build}) => build.loaders.esbuild,

      options: ({path}) => ({
        loader: 'tsx',
        target: 'es2015',
        tsconfigRaw: pathExistsSync(
          path('project', 'tsconfig.json'),
        )
          ? readJson(path('project', 'tsconfig.json'))
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

    hooks.on<'build.resolve.extensions'>(
      'build.resolve.extensions',
      exts => ['.ts', '.tsx', ...exts],
    )
  },
}
