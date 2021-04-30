import '@roots/bud-extensions'

declare module '@roots/bud-framework' {
  interface Framework {
    /***
     * Configure stylelint
     */
    stylelint: Stylelint.Config
  }

  namespace Stylelint {
    type Options = any
    type Config = (options: Stylelint.Options) => Framework
  }

  namespace Hooks.Extension {
    interface Definitions {
      'stylelint-webpack-plugin': Module
    }
  }
}
