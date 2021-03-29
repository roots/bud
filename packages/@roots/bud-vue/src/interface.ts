import '@roots/bud-framework'
import '@roots/bud-api'
import '@roots/bud-babel'

declare module '@roots/bud-framework' {
  namespace Framework.Hooks {
    namespace Loader {
      interface Base {
        vue: any
        'vue-style': any
      }
    }

    namespace Item {
      interface Base {
        vue: any
        'vue-style': any
      }
    }

    namespace Rule {
      interface Base {
        vue: any
      }
    }

    namespace Extension {
      interface Base {
        'vue-loader-plugin': any
      }
    }
  }
}
