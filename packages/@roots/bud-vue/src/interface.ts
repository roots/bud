import '@roots/bud-framework'
import '@roots/bud-api'
import '@roots/bud-babel'

declare module '@roots/bud-framework' {
  namespace Framework.Hooks.Extension {
    interface Definitions {
      '@roots/bud-vue': any
      'vue-loader-plugin': any
    }
  }

  namespace Framework.Hooks.Loader {
    interface Definitions {
      vue: any
      'vue-style': any
    }
  }

  namespace Framework.Hooks.Item {
    interface Definitions {
      vue: any
      'vue-style': any
    }
  }

  namespace Framework.Hooks.Rule {
    interface Definitions {
      vue: any
    }
  }
}
