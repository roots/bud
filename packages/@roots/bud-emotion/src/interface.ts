import '@roots/bud-babel'
import '@roots/bud-extensions'

declare module '@roots/bud-framework' {
  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-emotion': Module
    }
  }

  namespace Hooks.Item {
    interface Definitions {
      babel: any
    }
  }
}
