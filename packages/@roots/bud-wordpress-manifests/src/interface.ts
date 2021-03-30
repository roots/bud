import '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Framework.Hooks.Extension {
    interface Definitions {
      '@roots/bud-wordpress-manifests': any
      '@roots/merged-manifest-webpack-plugin': any
    }
  }
}
