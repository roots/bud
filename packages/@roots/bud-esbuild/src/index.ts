import './interface'
import type {Module} from '@roots/bud-framework'
import {ESBuildMinifyPlugin} from 'esbuild-loader'
import {features} from './features/index'
import {setOptions} from './api/index'

const esbuild: Module = {
  name: '@roots/bud-esbuild',

  boot: ({extensions, hooks, store, isProduction}) => {
    features.forEach(feature => extensions.add(feature))

    hooks.on('build/optimization/minimizer', () => [
      new ESBuildMinifyPlugin({
        target: hooks.filter('item/esbuild-js/options/target'),
        exclude: store.get('patterns.modules'),
        css: true,
      }),
    ])

    extensions.has('optimize-css-assets-webpack-plugin') &&
      extensions.discard('optimize-css-assets-webpack-plugin')

    hooks.on('build/optimization/minimize', () => isProduction)
  },

  api: app => ({
    esbuild: setOptions.bind(app),
  }),
}

const {name, boot, api} = esbuild
export {name, boot, api}
