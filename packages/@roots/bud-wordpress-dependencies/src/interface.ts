import '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Framework.Hooks.Extension {
    interface Definitions {
      '@roots/wordpress-dependencies-webpack-plugin': any
    }
  }
}
