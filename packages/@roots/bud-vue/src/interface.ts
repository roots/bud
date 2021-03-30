import '@roots/bud-framework'
import '@roots/bud-api'
import '@roots/bud-babel'

declare module '@roots/bud-framework' {
  /**
   * vue loader
   */
  namespace Framework.Hooks.Loader {
    interface Definitions {
      vue: any
      'vue-style': any
    }
  }

  /**
   * vue item
   */
  namespace Framework.Hooks.Item {
    interface Definitions {
      vue: any
      'vue-style': any
    }
  }

  /**
   * vue rule
   */
  namespace Framework.Hooks.Rule {
    interface Definitions {
      vue: any
    }
  }

  /**
   * vue-loader extension
   */
  namespace Framework.Hooks.Extension {
    interface Definitions {
      'vue-loader-plugin': any
    }
  }
}
