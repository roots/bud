// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * ESBuild support for Bud projects
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @beta
 * This plugin is much more limited in terms of supporting essential dev-focused features
 * like hot-reloading. It is provided as-is for use in Bud projects. It is not currently a focus
 * of our development efforts.
 *
 * @remarks
 * If you would like to contribute to the development of this plugin (especially if you have experience
 * with module reloading in an ESBuild context), please open an issue on Github.
 * @packageDocumentation
 */

import {Item, Loader, Rule} from '@roots/bud-build'
import {Extension} from '@roots/bud-framework'
import {ESBuildMinifyPlugin} from 'esbuild-loader'

import {esbuild} from './bud.esbuild'
import {features} from './features'

declare module '@roots/bud-framework' {
  interface Bud {
    esbuild: esbuild
  }

  interface Modules {
    '@roots/bud-esbuild': Extension.Module
    '@roots/bud-esbuild/js': Extension.Module
    '@roots/bud-esbuild/ts': Extension.Module
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

/**
 * ESBuild base extension
 *
 * @beta
 */
const extension: Extension.Module = {
  name: '@roots/bud-esbuild',

  options: ({store}) => ({
    target: store.get('patterns.js'),
    exclude: store.get('patterns.modules'),
  }),

  boot: async ({build, extensions, hooks}) => {
    build.setLoader('esbuild', require.resolve('esbuild-loader'))

    Promise.all(
      features.map(async feature => await extensions.add(feature)),
    )

    hooks.on('build.optimization.minimizer', () => [
      new ESBuildMinifyPlugin(
        extensions.get('@roots/bud-esbuild').options.all(),
      ),
    ])
  },

  api: {esbuild},
}

export const {name, boot, options, api} = extension
