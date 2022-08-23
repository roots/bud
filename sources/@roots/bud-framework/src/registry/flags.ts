export interface Flags {
  /**
   * Clean dist directory prior to compilation
   *
   * @public
   */
  clean: boolean

  /**
   * Hash emitted filenames
   *
   * @public
   */
  hash: boolean

  /**
   * Emit an html file during compilation
   *
   * @public
   */
  html: boolean

  /**
   * Automatically register installed extensions
   *
   * @public
   */
  inject: boolean

  /**
   * Log build status informatino to the terminal
   *
   * @public
   */
  log: boolean

  /**
   * Emit a manifest.json with references to emitted assets
   *
   * @public
   */
  manifest: boolean

  /**
   * @public
   */
  runtimeChunk: boolean

  /**
   * Enable code splitting
   *
   * @public
   */
  splitChunks: boolean
}

export namespace Flags {
  export type HookMap = {
    [K in keyof Flags as `feature.${K & string}`]: Flags[K]
  }
}
