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
