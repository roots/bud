export interface Values {
  /**
   * File format (when hashing is disabled)
   *
   * @remarks
   * do not include extension
   *
   * @public
   */
  'value.fileFormat': string

  /**
   * File format (when hashing is enabled)
   *
   * @remarks
   * do not include extension
   *
   * @defaultValue '[name].[contenthash:6]'
   *
   * @public
   */
  'value.hashFormat': string
}
