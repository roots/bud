import type {Extension} from '@roots/bud-framework'
import {fs} from '@roots/bud-support'

const {pathExists, readJson} = fs

export const tsFeature: Extension.Module = {
  name: '@roots/bud-esbuild/ts',

  options: async ({path}) => ({
    loader: 'tsx',
    target: 'es2015',
    tsconfigRaw: (await pathExists(path('tsconfig.json')))
      ? await readJson(path('tsconfig.json'))
      : {
          compilerOptions: {
            importsNotUsedAsValues: 'remove',
          },
        },
  }),

  boot: async ({hooks}) => {
    hooks
      .on('build.resolve.extensions', ext => ext.add('.ts').add('.tsx'))
      .build.setItem('es-build-ts', {
        loader: `esbuild`,
        options: ({extensions}) => ({
          loader: 'tsx',
          target: 'es2015',
          tsconfigRaw: extensions
            .get(`@roots/bud-esbuild/ts`)
            .options.all(),
        }),
      })
      .setRule('ts', {
        test: app => app.store.get('patterns.ts'),
        exclude: app => app.store.get('patterns.modules'),
        use: [`esbuild-ts`],
      })
  },
}
