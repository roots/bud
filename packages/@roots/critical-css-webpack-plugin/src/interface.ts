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
   * Minify critical-path CSS when inlining
   */
  minify?: boolean

  /**
   * Extract inlined styles from referenced stylesheets
   */
  hash?: boolean

  /**
   * Ignore CSS rules
   */
  ignore?: {
    atrule: string[]
    rule: RegExp[]
    decl: (node: any, value: any) => boolean
  }
}
