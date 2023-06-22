export interface Sync {
  /**
   * File format (when hashing is disabled)
   *
   * @remarks
   * do not include extension
   */
  fileFormat: string

  /**
   * File format (when hashing is enabled)
   *
   * @remarks
   * do not include extension
   *
   * @defaultValue '[name].[contenthash:6]'
   */
  hashFormat: string
}

export type SyncRegistry = {
  [K in keyof Sync as `value.${K & string}`]?: Sync[K]
}

export interface Async {}

export type AsyncRegistry = {
  [K in keyof Async as `value.${K & string}`]?: Async[K]
}

export type Registry = SyncRegistry & AsyncRegistry
