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
