import '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Framework.Hooks.Extension {
    interface Definitions {
      '@roots/wordpress-externals-webpack-plugin': any
    }
  }
}
