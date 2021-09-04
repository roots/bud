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
 * @author Kelly Mears <kelly@roots.io>
 * @license MIT
 *
 * @packageDocumentation
 */

import type {Module} from '@roots/bud-framework'
import {WordPressDependenciesWebpackPlugin as Plugin} from '@roots/wordpress-dependencies-webpack-plugin'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/wordpress-dependencies-webpack-plugin': Module
    }
  }
}

export const name: Module['name'] =
  '@roots/wordpress-dependencies-webpack-plugin'

export const make: Module.Make<Plugin, null> = () => new Plugin()
