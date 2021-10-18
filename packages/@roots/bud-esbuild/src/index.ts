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
 * @extension @packageDocumentation @betaDocumentation
 */

import {Item, Loader, Rule} from '@roots/bud-build'
import {Extension} from '@roots/bud-framework'
import {ESBuildMinifyPlugin} from 'esbuild-loader'

import {setOptions} from './api'
import {features} from './features'

declare module '@roots/bud-framework' {
  /**
   * {@inheritDoc @roots/bud-framework#Framework}
   *
   * @override
   */
  interface Framework {
    esbuild: {setOptions: typeof setOptions}
  }

  /**
   * {@inheritDoc @roots/bud-framework#Items}
   *
   * @override
   */
  interface Modules {
    /**
     * Base extension for ESBuild
     *
     * @beta
     */
    '@roots/bud-esbuild': Extension.Module
    /**
     * JS support for ESBuild
     *
     * @beta
     */
    '@roots/bud-esbuild/js': Extension.Module
    /**
     * TS support for ESBuild
     *
     * @beta
     */
    '@roots/bud-esbuild/ts': Extension.Module
  }

  /**
   * {@inheritDoc @roots/bud-framework#Loaders}
   *
   * @override
   */
  interface Loaders {
    /**
     * ESBuild compiler loader for JavaScript
     *
     * @beta
     */
    'esbuild-js': Loader

    /**
     * ESBuild compiler loader for TypeScript
     *
     * @beta
     */
    'esbuild-ts': Loader
  }

  /**
   * {@inheritDoc @roots/bud-framework#Items}
   *
   * @override
   */
  interface Items {
    /**
     * ESBuild {@link @roots/bud-framework#Item | Compiler Item} for JavaScript
     *
     * @beta
     */
    'esbuild-js': Item

    /**
     * ESBuild {@link @roots/bud-framework#Item | Compiler Item} for JavaScript
     *
     * @beta
     */
    'esbuild-ts': Item
  }

  /**
   * {@inheritDoc @roots/bud-framework#Rules}
   *
   * @override
   */
  interface Rules {
    /**
     * ESBuild {@link @roots/bud-framework#Item | Compiler Rule} for TypeScript
     *
     * @remarks
     * This will act as @override of TypeScript features if you have already
     * included a TypeScript compilation plugin like `@roots/bud-typescript`.
     *
     * You do not need both extensions.
     *
     * @override @beta
     */
    ts: Rule
  }
}

/**
 * ESBuild base extension
 *
 * @beta
 */
const esbuild: Extension.Module = {
  /**
   * {@inheritDoc @roots/bud-framework#Extension.Module.name}
   *
   * @beta
   */
  name: '@roots/bud-esbuild',

  /**
   * {@inheritDoc @roots/bud-framework#Extension.Module.options}
   *
   * @beta
   */
  options: ({store}) => ({
    target: store.get('patterns.js'),
    exclude: store.get('patterns.modules'),
  }),

  /**
   * {@inheritDoc @roots/bud-framework#Extension.Module.boot}
   *
   * @beta
   */
  boot: ({extensions, hooks}) => {
    features.forEach(feature => extensions.add(feature))

    hooks.on('build/optimization/minimizer', minimizer => [
      ...(minimizer ?? []),
      new ESBuildMinifyPlugin(
        hooks.filter('extension/@roots/bud-esbuild/options'),
      ),
    ])
  },

  /**
   * {@inheritDoc @roots/bud-framework#Extension.Module.api}
   *
   * @beta
   */
  api: app => ({
    esbuild: setOptions.bind(app),
  }),
}

export const {name, boot, options, api} = esbuild
