export interface Flags {
  /**
   * Clean dist directory prior to compilation
   */
  clean: boolean

  /**
   * Hash emitted filenames
   */
  hash: boolean

  /**
   * Emit an html file during compilation
   */
  html: boolean

  /**
   * Log build status informatino to the terminal
   */
  log: boolean

  /**
   * Emit a manifest.json with references to emitted assets
   */
  manifest: boolean

  /**
   */
  runtimeChunk: boolean

  /**
   * Enable code splitting
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
