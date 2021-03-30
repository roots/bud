import '@roots/bud-framework'
import '@roots/bud-postcss'

declare module '@roots/bud-framework' {
  namespace Framework.Hooks.Loader {
    interface Definitions {
      sass: string
    }
  }

  namespace Framework.Hooks.Item {
    interface Definitions {
      sass: Subject
      postcss: Subject
    }
  }

  namespace Framework.Hooks.Rule {
    interface Definitions {
      sass: Subject
    }
  }
}
