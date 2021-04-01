import './interface'
import type {Framework, Module} from '@roots/bud-framework'
import {ESBuildPlugin, ESBuildMinifyPlugin} from 'esbuild-loader'
import {setOptions, jsx} from './api'

/**
 * @const esbuild
 * @implements Extension
 */
const esbuild: Module = {
  name: '@roots/bud-esbuild',
  boot: ({extensions, hooks, subscribe, store}: Framework) => {
    extensions.add(plugin)
    extensions.add(tsSupport)
    extensions.add(jsSupport)

    hooks.on('build/optimization/minimizer', () => [
      new ESBuildMinifyPlugin({
        target: subscribe('item/esbuild-js/options/target'),
        exclude: store.get('patterns.modules'),
      }),
    ])
  },
}

/**
 * @const esbuildPlugin
 * @implements esbuild-loader's webpack plugin
 */
const plugin: Module = {
  name: 'esbuild-plugin',
  make: () => new ESBuildPlugin(),
  api: (app: Framework) => ({
    esbuild: {
      setOptions: setOptions.bind(app),
      jsx: jsx.bind(app),
    },
  }),
}

/**
 * @const jsSupport
 * @description Use ESBuild for JS compilation
 * @implements Module
 */
const jsSupport: Module = {
  name: '@roots/bud-esbuild/js',
  boot: ({publish, subscribe}: Framework) => {
    publish({
      'loader/esbuild-js': () =>
        require.resolve('esbuild-loader'),
    })

    publish({
      'rule/js/use': () => [subscribe('item/esbuild-js')],
    })

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

/**
 * @const tsSupport
 * @description Use ESBuild for typescript compilation
 * @implements Module
 */
const tsSupport: Module = {
  name: '@roots/bud-esbuild/ts',
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

/**
 * @exports default
 */
export {esbuild as default}

/**
 * @exports module
 */
const {name, boot} = esbuild
export {name, boot}
