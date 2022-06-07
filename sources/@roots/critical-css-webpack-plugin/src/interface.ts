/**
 * Plugin constructor options
 *
 * @public
 */
export interface Options {
  /**
   * Html source string
   *
   * @public
   */
  src?: string

  /**
   * Html source string
   *
   * @public
   */
  html?: string

  /**
   * Base directory
   *
   * @public
   */
  base?: string

  /**
   * Viewport width
   *
   * @public
   */
  width?: number

  /**
   * Viewport height
   *
   * @public
   */
  height?: number

  /**
   * Extract critical
   *
   * @public
   */
  extract?: boolean

  /**
   * Ignore CSS rules
   *
   * @public
   */
  ignore?: {
    atrule: string[]
    rule: RegExp[]
    decl: (node: any, value: any) => boolean
  }

  /**
   * Options for node server request
   *
   * @remarks
   * Request handled by `got`
   *
   * @public
   */
  request?: any
}
