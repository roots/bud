import './interface'
import type {Module} from '@roots/bud-framework'

import {features} from './features'
import {setOptions, jsx} from './api'
import {ESBuildMinifyPlugin} from 'esbuild-loader'

/**
 * @interface EsbuildModule
 * @extends Module
 */
declare interface EsbuildModule extends Module {
  name: '@roots/bud-esbuild'
  boot: Module['boot']
  api: Module['api']
}

/**
 * @exports esbuild
 * @implements {EsbuildModule}
 */
export const esbuild: EsbuildModule = {
  name: '@roots/bud-esbuild',

  boot: ({use, hooks, subscribe, store}) => {
    use(features)

    hooks.on('build/optimization/minimizer', () => [
      new ESBuildMinifyPlugin({
        target: subscribe('item/esbuild-js/options/target'),
        exclude: store.get('patterns.modules'),
      }),
    ])
  },

  api: app => ({
    esbuild: {
      setOptions: setOptions.bind(app),
      jsx: jsx.bind(app),
    },
  }),
}

/**
 * @exports default
 */
export {esbuild as default}

/**
 * Support for import * syntax
 */
const {name, boot, api} = esbuild
export {name, boot, api}
