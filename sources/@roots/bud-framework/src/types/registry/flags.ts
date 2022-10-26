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

export type Sync = Flags

export type SyncRegistry = {
  [P in keyof Sync as `feature.${P & string}`]: Sync[P]
}

export interface Async {}

export type AsyncRegistry = {
  [P in keyof Async as `feature.${P & string}`]: Async[P]
}

export type Registry = SyncRegistry & AsyncRegistry
