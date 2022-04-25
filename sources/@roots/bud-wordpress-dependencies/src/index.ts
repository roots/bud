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
    '@roots/bud-wordpress-dependencies': Extension<
      null,
      WordPressDependenciesWebpackPlugin
    >
  }
}

export const label: Extension['label'] =
  '@roots/bud-wordpress-dependencies'

export const plugin: Extension<
  null,
  WordPressDependenciesWebpackPlugin
>['plugin'] = WordPressDependenciesWebpackPlugin
