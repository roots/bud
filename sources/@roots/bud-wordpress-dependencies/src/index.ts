// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * {@link @roots/wordpress-dependencies-webpack-plugin# | @roots/wordpress-dependencies-webpack-plugin} adapter
 *
 * @see https://bud.js.org
 *
 * @packageDocumentation
 */

import type {Plugin} from '@roots/bud-framework/types/extension/plugin'
import {WordPressDependenciesWebpackPlugin} from '@roots/wordpress-dependencies-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/wordpress-dependencies-webpack-plugin': Plugin
  }
}

/** @public */
export const label: Plugin['label'] =
  '@roots/wordpress-dependencies-webpack-plugin'

/** @public */
export const make: Plugin<
  WordPressDependenciesWebpackPlugin,
  null
>['make'] = () => new WordPressDependenciesWebpackPlugin()
