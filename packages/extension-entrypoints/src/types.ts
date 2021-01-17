import '@roots/bud'
import * as Entrypoints from '@roots/entrypoints-webpack-plugin'
import type {Module} from '@roots/bud-typings'

export namespace Extension {
  export type Make = Module.Make<
    Entrypoints.Plugin,
    Entrypoints.Options
  >
}

declare module '@roots/bud' {
  type Entrypoints = (options: Entrypoints.Options) => Bud

  export interface Bud {
    /**
     * ## bud.entrypoints
     *
     * Modify entrypoints options.
     *
     * ### Usage
     *
     * ```js
     * bud.entrypoints({name: 'custom-entrypoints-output.json})
     * ```
     */
    entrypoints: Bud.Entrypoints
  }

  export namespace Bud {
    export {Entrypoints}
  }
}
