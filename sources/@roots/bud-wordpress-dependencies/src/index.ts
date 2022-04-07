// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * {@link @roots/wordpress-dependencies-webpack-plugin# | @roots/wordpress-dependencies-webpack-plugin} adapter
 *
 * @see https://bud.js.org
 *
 * @packageDocumentation
 */

import type {Extensions} from '@roots/bud-framework'
import {WordPressDependenciesWebpackPlugin as Plugin} from '@roots/wordpress-dependencies-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Plugins {
    '@roots/wordpress-dependencies-webpack-plugin': Extensions.Plugin
  }
}

/**
 * @public
 */
export const name: Extensions.Plugin['name'] =
  '@roots/wordpress-dependencies-webpack-plugin'

/**
 * @public
 */
export const make: Extensions.Plugin<Plugin, null>['make'] = () =>
  new Plugin()
