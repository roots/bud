import '@roots/bud-framework'
import '@roots/bud-api'
import '@roots/bud-babel'

declare module '@roots/bud-framework' {
  namespace Framework.Hooks {
    namespace Loader {
      interface Base {
        vue: Subject
        'vue-style': Subject
      }
    }

    namespace Item {
      interface Base {
        vue: Subject
        'vue-style': Subject
      }
    }

    namespace Rule {
      interface Base {
        vue: Subject
      }
    }
  }
}
