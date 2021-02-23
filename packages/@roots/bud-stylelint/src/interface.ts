import '@roots/bud'
import '@roots/bud-framework'

declare module '@roots/bud-framework' {
  export interface Framework {
    /***
     * Configure stylelint
     */
    stylelint: Framework.Stylelint.Config
  }

  export namespace Framework.Stylelint {
    export type Options = any

    export type Config = (
      options: Stylelint.Options,
    ) => Framework
  }
}
