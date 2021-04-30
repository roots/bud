import '@roots/bud-extensions'

declare module '@roots/bud-framework' {
  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-entrypoints': Module
    }
  }
}
