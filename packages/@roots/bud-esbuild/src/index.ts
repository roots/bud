import './interface'
import {Framework, Module} from '@roots/bud-framework'

import {features} from './features'
import {setOptions, jsx} from './api'
import {ESBuildMinifyPlugin} from 'esbuild-loader'

/**
 * @exports esbuild
 * @implements {EsbuildModule}
 */
export const esbuild: Module = {
  /**
   * @property name
   */
  name: '@roots/bud-esbuild',

  /**
   * @property boot
   */
  boot: ({use, hooks, subscribe, store}) => {
    use(features)

    hooks.on('build/optimization/minimizer', () => [
      new ESBuildMinifyPlugin({
        target: subscribe('item/esbuild-js/options/target'),
        exclude: store.get('patterns.modules'),
      }),
    ])
  },

  /**
   * @property api
   */
  api: (app: Framework) => ({
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
