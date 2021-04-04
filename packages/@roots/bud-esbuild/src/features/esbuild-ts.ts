import type {Module, Framework} from '@roots/bud-framework'

/**
 * @const tsFeature
 * @description Compiles typescript with esbuild
 */
export const tsFeature: Module = {
  /**
   * @property esbuild.name
   * @description extension identifier
   */
  name: '@roots/bud-esbuild/ts',

  /**
   * @property esbuild.boot
   * @description code to be run on extension boot event
   */
  boot: ({
    disk,
    hooks,
    publish,
    subscribe,
    store,
  }: Framework) => {
    publish({
      'loader/esbuild-ts': () =>
        require.resolve('esbuild-loader'),
    })

    publish({
      rule: rule => ({
        ...rule,
        ts: subscribe('rule/ts'),
      }),
      'rule/ts': () => ({
        test: store.get('patterns.ts'),
        exclude: store.get('patterns.modules'),
        use: [subscribe('item/esbuild-ts')],
      }),
    })

    publish({
      'item/esbuild-ts': () => ({
        loader: subscribe('loader/esbuild-ts'),
        options: {
          loader: subscribe('item/esbuild-ts/options/loader'),
          target: subscribe('item/esbuild-ts/options/target'),
          tsConfigRaw: subscribe(
            'item/esbuild-ts/options/tsConfigRaw',
          ),
        },
      }),
      'item/esbuild-ts/options/loader': () => 'tsx',
      'item/esbuild-ts/options/target': () => 'es2015',
      'item/esbuild-ts/options/tsconfigRaw': () =>
        disk.get('project').has('tsconfig.json')
          ? disk.get('project').readJson('tsconfig.json')
          : {
              compilerOptions: {
                importsNotUsedAsValues: 'remove',
              },
            },
    })

    hooks.on(
      'build/resolve/extensions',
      (exts: string & `.${string}`) => ['.ts', '.tsx', ...exts],
    )
  },
}
