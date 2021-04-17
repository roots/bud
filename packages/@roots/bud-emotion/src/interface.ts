import '@roots/bud-babel'
import {Module} from '@roots/bud-framework'

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
