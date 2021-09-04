/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @see https://roots.io/bud
 *
 * @remarks
 * - 💁 Composable - Build boss web applications with a modular, hackable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @remarks
 * WordPress provides many packages which do not need to
 * be included in your project distributables. This package
 * replaces source code references to WordPress provided
 * packages and collects the package references in the
 * entrypoints manifest.
 *
 * Best used with the `@roots/bud-entrypoints` package.
 *
 * @export {name} The plugin name
 * @export {make} The plugin factory
 *
 * @author Kelly Mears <kelly@roots.io>
 * @license MIT
 *
 * @packageDocumentation
 */

import type {Module} from '@roots/bud-framework'
import {
  Plugin,
  WordPressExternals,
} from '@roots/wordpress-externals-webpack-plugin'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/wordpress-externals-webpack-plugin': Module
    }
  }
}

export const name: Module['name'] =
  '@roots/wordpress-externals-webpack-plugin'

export const make: Module.Make<
  Plugin,
  WordPressExternals.Options
> = () => new Plugin()
