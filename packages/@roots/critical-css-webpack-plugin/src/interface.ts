export type Options = Options.Src | Options.Html

export namespace Options {
  export interface Base {
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

  export interface Src extends Base {
    /**
     * Html source string
     */
    src?: string
  }

  export interface Html extends Base {
    /**
     * Html file
     */
    html?: string
  }
}
