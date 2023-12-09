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
   * Uses {@link https://github.com/sindresorhus/got | sindresorhus/got} for request parsing.
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
