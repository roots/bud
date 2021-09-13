/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @see https://roots.io/bud
 *
 * @packageDocumentation
 */

import type {Extension} from '@roots/bud-framework'
import {WordPressDependenciesWebpackPlugin as Plugin} from '@roots/wordpress-dependencies-webpack-plugin'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/wordpress-dependencies-webpack-plugin': Extension.CompilerPlugin
    }
  }
}

export const name: Extension.CompilerPlugin['name'] =
  '@roots/wordpress-dependencies-webpack-plugin'

export const make: Extension.CompilerPlugin<
  Plugin,
  null
>['make'] = () => new Plugin()
