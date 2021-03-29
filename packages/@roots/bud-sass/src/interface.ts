import '@roots/bud'
import '@roots/bud-postcss'

declare module '@roots/bud-framework' {
  export namespace Framework {
    namespace Hooks {
      namespace Loader {
        interface Base {
          sass: Subject
        }
      }

      namespace Item {
        interface Base {
          sass: Subject
          postcss: Subject
        }
      }

      namespace Rule {
        interface Base {
          sass: Subject
        }
      }
    }
  }
}
