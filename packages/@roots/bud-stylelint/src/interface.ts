import '@roots/bud'

declare module '@roots/bud' {
  export interface Bud {
    /***
     * Configure stylelint
     */
    stylelint: Bud.Stylelint.Config
  }

  export namespace Bud.Stylelint {
    export type Options = any

    export type Config = (
      this: Bud,
      options: Stylelint.Options,
    ) => Bud
  }
}
