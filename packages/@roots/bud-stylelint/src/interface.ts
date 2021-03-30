import '@roots/bud'
import '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /***
     * Configure stylelint
     */
    stylelint: Framework.Stylelint.Config
  }

  namespace Framework.Stylelint {
    type Options = any
    type Config = (options: Stylelint.Options) => Framework
  }

  namespace Framework.Hooks.Extension {
    interface Definitions {
      'stylelint-webpack-plugin': Framework.Module
    }
  }
}
