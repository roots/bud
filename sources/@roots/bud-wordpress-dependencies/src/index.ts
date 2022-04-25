// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * `@roots/wordpress-dependencies-webpack-plugin` adapter
 *
 * @see https://bud.js.org
 *
 * @packageDocumentation
 */

import {Extension} from '@roots/bud-framework'
import {WordPressDependenciesWebpackPlugin} from '@roots/wordpress-dependencies-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/wordpress-dependencies-webpack-plugin': Plugin
  }
}

export const label: Extension['label'] =
  '@roots/wordpress-dependencies-webpack-plugin'

export const plugin: Extension<
  null,
  WordPressDependenciesWebpackPlugin
>['plugin'] = WordPressDependenciesWebpackPlugin
