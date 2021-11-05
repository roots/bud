// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * ESBuild support for Bud projects
 *
 * @see https://roots.io/bud
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
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @packageDocumentation @betaDocumentation
 */

import {Item, Loader, Rule} from '@roots/bud-build'
import {Extension} from '@roots/bud-framework'
import {ESBuildMinifyPlugin} from 'esbuild-loader'

import {setOptions} from './api'
import {features} from './features'

declare module '@roots/bud-framework' {
  interface Framework {
    esbuild: {setOptions: typeof setOptions}
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
const esbuild: Extension.Module = {
  name: '@roots/bud-esbuild',

  options: ({store}) => ({
    target: store.get('patterns.js'),
    exclude: store.get('patterns.modules'),
  }),

  boot: ({build, extensions, hooks}) => {
    build.loaders.esbuild = new Loader(
      require.resolve('esbuild-loader'),
    )

    features.forEach(feature => extensions.add(feature))

    hooks.on('build.optimization.minimizer', () => [
      new ESBuildMinifyPlugin(
        extensions.get('@roots/bud-esbuild').options.all(),
      ),
    ])
  },

  api: app => ({
    esbuild: setOptions.bind(app),
  }),
}

export const {name, boot, options, api} = esbuild
