// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * {@link @roots/wordpress-dependencies-webpack-plugin# | @roots/wordpress-dependencies-webpack-plugin} adapter
 *
 * @see https://roots.io/bud
 *
 * @packageDocumentation
 */

import type {Extension} from '@roots/bud-framework'
import {WordPressDependenciesWebpackPlugin as Plugin} from '@roots/wordpress-dependencies-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Plugins {
    '@roots/wordpress-dependencies-webpack-plugin': Extension.CompilerPlugin
  }
}

/**
 * @public
 */
export const name: Extension.CompilerPlugin['name'] =
  '@roots/wordpress-dependencies-webpack-plugin'

/**
 * @public
 */
export const make: Extension.CompilerPlugin<Plugin, null>['make'] = () =>
  new Plugin()
