import {Item} from '@roots/bud-build'
import type {Extension, Framework} from '@roots/bud-framework'
import {fs} from '@roots/bud-support'

const {pathExistsSync, readJson} = fs

export const tsFeature: Extension.CompilerPlugin = {
  name: '@roots/bud-esbuild/ts',

  boot: ({build, hooks}: Framework) => {
    build.items['esbuild-ts'] = new Item({
      loader: ({build}) => build.loaders.esbuild,

      options: ({path}) => ({
        loader: 'tsx',
        target: 'es2015',
        tsconfigRaw: pathExistsSync(path('project', 'tsconfig.json'))
          ? readJson(path('project', 'tsconfig.json'))
          : {
              compilerOptions: {
                importsNotUsedAsValues: 'remove',
              },
            },
      }),
    })

    build.setRule('ts', {
      test: app => app.store.get('patterns.ts'),
      exclude: app => app.store.get('patterns.modules'),
      use: app => [app.build.items['esbuild-ts']],
    })

    hooks.on('build.resolve.extensions', exts => ['.ts', '.tsx', ...exts])
  },
}
