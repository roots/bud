/**
 * CriticalCssWebpackPlugin
 */

import CriticalCssWebpackPlugin from '@roots/critical-css-webpack-plugin/plugin'

/**
 * Plugin constructor options
 */
export interface Options {
  /**
   * Base directory
   */
  base?: string

  /**
   * Extract critical
   */
  extract?: boolean

  /**
   * Viewport height
   */
  height?: number

  /**
   * Html source string
   */
  html?: string

  /**
   * Ignore CSS rules
   */
  ignore?: {
    atrule: string[]
    decl: (node: any, value: any) => boolean
    rule: RegExp[]
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

  /**
   * Html source string
   */
  src?: string

  /**
   * Viewport width
   */
  width?: number
}

export default CriticalCssWebpackPlugin
