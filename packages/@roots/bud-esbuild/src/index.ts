import './interface'

import type {Module} from '@roots/bud-framework'
import {ESBuildMinifyPlugin} from 'esbuild-loader'

import {setOptions} from './api/index'
import {features} from './features/index'

const esbuild: Module = {
  name: '@roots/bud-esbuild',

  options: ({hooks, store}) => ({
    target: store.get('patterns.js'),
    exclude: store.get('patterns.modules'),
  }),

  boot: ({extensions, hooks, store}) => {
    features.forEach(feature => extensions.add(feature))

    hooks.on('build/optimization/minimizer', minimizer => [
      ...(minimizer ?? []),
      new ESBuildMinifyPlugin(
        hooks.filter('extension/@roots/bud-esbuild/options'),
      ),
    ])
  },

  api: app => ({
    esbuild: setOptions.bind(app),
  }),
}

export default esbuild
export const {name, boot, api} = esbuild
