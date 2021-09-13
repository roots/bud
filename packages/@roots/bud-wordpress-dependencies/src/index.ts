// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

/**
 * {@link @roots/wordpress-dependencies-webpack-plugin# | @roots/wordpress-dependencies-webpack-plugin} adapter
 *
 * @see https://roots.io/bud
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import type {Extension} from '@roots/bud-framework'
import {WordPressDependenciesWebpackPlugin as Plugin} from '@roots/wordpress-dependencies-webpack-plugin'

declare module '@roots/bud-framework' {
  /**
   * {@inheritDoc @roots/bud-framework#Plugins}
   *
   * @public @override
   */
  interface Plugins {
    /**
     * {@link @roots/wordpress-dependencies-webpack-plugin# | @roots/wordpress-dependencies-webpack-plugin} adapter
     *
     * @public
     */
    '@roots/wordpress-dependencies-webpack-plugin': Extension.CompilerPlugin
  }
}

/**
 * {@inheritDoc @roots/bud-framework#Extension.CompilerPlugin.name}
 *
 * @public
 */
export const name: Extension.CompilerPlugin['name'] =
  '@roots/wordpress-dependencies-webpack-plugin'

/**
 * {@inheritDoc @roots/bud-framework#Extension.CompilerPlugin.make}
 *
 * @public
 */
export const make: Extension.CompilerPlugin<
  Plugin,
  null
>['make'] = () => new Plugin()
