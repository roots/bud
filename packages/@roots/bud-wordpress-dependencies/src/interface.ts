import {Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/wordpress-dependencies-webpack-plugin': Module
    }
  }
}
