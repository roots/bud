// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

/**
 * WordPress provides many packages which do not need to be included in your project distributables.
 *
 * This package replaces source code references to WordPress provided packages and collects package
 * references in the {@link @roots/bud-entrypoints# | entrypoints manifest}
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud

 * @remarks
 * Best used with {@link @roots/bud-entrypoints# | @roots/bud-entrypoints extension} as a peer extension.
 *
 * @packageDocumentation
 */

import {PluginAdapter} from './PluginAdapter'

declare module '@roots/bud-framework' {
  /**
   * @override {@link @roots/bud-framework#Plugins}
   *
   * @public
   */
  interface Plugins {
    /**
     * WordPress Externals Webpack Plugin
     *
     * @public
     */
    '@roots/wordpress-externals-webpack-plugin': PluginAdapter
  }
}

export const {name, make} = PluginAdapter

export {PluginAdapter}
