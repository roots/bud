import '@roots/bud-babel'
import '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Framework.Hooks.Extension {
    interface Definitions {
      '@roots/bud-emotion': Framework.Module
    }
  }

  namespace Framework.Hooks.Item {
    interface Definitions {
      babel: Framework.Hooks.Item.Subject
    }
  }
}
