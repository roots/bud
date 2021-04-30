import '@roots/bud-extensions'

declare module '@roots/bud-framework' {
  namespace Hooks.Extension {
    interface Definitions {
      '@roots/wordpress-dependencies-webpack-plugin': Module
    }
  }
}
