import {Item, Loader, Rule} from '@roots/bud-build'
import type {Module} from '@roots/bud-framework'
import {ESBuildMinifyPlugin} from 'esbuild-loader'

import {setOptions} from './api/index'
import {features} from './features/index'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.esbuild.setOptions
     *
     * Configure esbuild-loader options
     *
     * ### Usage
     *
     * ```js
     * bud.babel.setOptions({
     *  target: 'es2020',
     * })
     * ```
     */
    esbuild: {setOptions: typeof setOptions}
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-esbuild': Module
      '@roots/bud-esbuild/js': Module
      '@roots/bud-esbuild/ts': Module
      'esbuild-plugin': Module
    }

    interface Loaders {
      'esbuild-js': Loader
      'esbuild-ts': Loader
    }

    interface Items {
      'esbuild-js': Item
      'esbuild-ts': Item
    }

    interface Rules {
      ts: Rule
    }
  }
}

const esbuild: Module = {
  name: '@roots/bud-esbuild',

  options: ({store}) => ({
    target: store.get('patterns.js'),
    exclude: store.get('patterns.modules'),
  }),

  boot: ({extensions, hooks}) => {
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

export const {name, boot, api} = esbuild
