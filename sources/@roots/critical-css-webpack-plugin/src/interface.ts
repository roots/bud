/**
 * Plugin constructor options
 */
export interface Options {
  /**
   * Html source string
   */
  src?: string

  /**
   * Html source string
   */
  html?: string

  /**
   * Base directory
   */
  base?: string

  /**
   * Viewport width
   */
  width?: number

  /**
   * Viewport height
   */
  height?: number

  /**
   * Extract critical
   */
  extract?: boolean

  /**
   * Ignore CSS rules
   */
  ignore?: {
    atrule: string[]
    rule: RegExp[]
    decl: (node: any, value: any) => boolean
  }

  /**
   * Node server request options
   *
   * @remarks
   * Uses sindresorhus/got for request parsing
   *
   * @see https://github.com/sindresorhus/got/blob/main/documentation/2-options.md
   */
  request?: any
}
