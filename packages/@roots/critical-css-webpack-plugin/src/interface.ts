export interface Options {
  criticalOptions?: {
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
  }

  /**
   * Extract inlined styles from referenced stylesheets
   */
  hash?: boolean

  /**
   * Replace var with inlined CSS
   */
  replace?: string
}
