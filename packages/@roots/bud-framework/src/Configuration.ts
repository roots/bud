import Webpack from 'webpack'

import {Index, Locations, Server} from '.'

interface CompilerConfig extends Partial<Webpack.Configuration> {
  optimization?: any
  infrastructureLogging?: any
}

/**
 * Framework base configuration
 *
 * @remarks
 * These are just initial values. They can be overwritten by the user, or extended by the framework/modules.
 * It is recommended to use {@link @roots/bud-framework#Hooks.on} to extend the
 *
 * @public
 */
export interface Configuration {
  /**
   * Application name
   *
   * @public
   */
  name: string

  /**
   * Mode
   *
   * @public
   */
  mode: 'production' | 'development'

  /**
   * Logger settings
   *
   * @public
   */
  log?: {
    /**
     * Log level
     *
     * @remarks
     * This is a little weird. It is not a standard log level (working around
     * Signale stuff). It would be better if 'log' and 'debug' were swapped.
     *
     * Map of levels:
     * - 'error' (least verbose)
     * - 'warn'
     * - 'log' (default)
     * - 'debug' (most verbose)
     *
     * @public
     */
    level?: 'v' | 'vv' | 'vvv' | 'vvvv'
  }

  /**
   * Features to enable
   *
   * @public
   */
  features: {
    /**
     * Is caching enabled?
     *
     * @public
     */
    cache?: boolean

    /**
     * Feature toggle: enable or disable the command line interface
     *
     * @defaultValue true
     *
     * @public
     */
    dashboard?: boolean

    /**
     * Feature toggle: Clean dist before compilation
     *
     * When enabled stale assets will be removed from
     * the `location.dist` directory prior to the next
     * compilation.
     *
     * @defaultValue true
     *
     * @public
     */
    clean?: boolean

    /**
     * Enable or disable filename hashing
     *
     * @defaultValue false
     *
     * @public
     */
    hash?: boolean

    /**
     * Emit html template
     *
     * @defaultValue true
     *
     * @public
     */
    html?: boolean

    /**
     * Automatically inject installed extensions
     *
     * @public
     */
    inject?: boolean

    /**
     * Automatically install peer dependencies
     *
     * @defaultValue false
     *
     * @public
     */
    install?: boolean

    /**
     * Log to console
     *
     * @defaultValue false
     *
     * @public
     */
    log?: boolean

    /**
     * Enable or disable producing a manifest.json file
     *
     * @defaultValue true
     *
     * @public
     */
    manifest?: boolean

    /**
     * Enable or disable runtime chunk
     *
     * @public
     */
    runtimeChunk?: boolean

    /**
     * Enable or disable chunk splitting (vendor)
     *
     * @defaultValue false
     *
     * @public
     */
    splitChunks?: boolean
  }

  /**
   * Shared regular expressions for pattern matching.
   *
   * @example
   * ```js
   * app.patterns.get('js')
   * ```
   *
   * @public
   */
  patterns: Record<string, RegExp>

  /**
   * Registered fs directories
   *
   * @public
   */
  location: Locations

  /**
   * File format (when hashing is disabled)
   *
   * @remarks
   * do not include extension
   *
   * @defaultValue '[name]'
   *
   * @public
   */
  fileFormat: string
  /**
   * File format when hashing is enabled
   *
   * @remarks
   * do not include extension
   *
   * @defaultValue '[name].[contenthash:6]'
   *
   * @public
   */
  hashFormat: string

  /**
   * @public
   */
  cli?: {
    args: Record<string, any>
    argv: Array<string>
    flags: Record<string, any>
    raw: Array<Record<string, string>>
    metadata: Record<string, Record<string, any>>
  }

  /**
   * Initial webpack configuration values
   *
   * @public
   */
  build: CompilerConfig

  /**
   * Cache settings
   *
   * @public
   */
  cache: {
    type?: 'filesystem' | 'memory' | false
  }

  /**
   * Initial options for registered extensions
   *
   * @public
   */
  extension: Index<any>

  /**
   * Server configuration
   *
   * @public
   */
  server: Server.Configuration

  /**
   * Command line theme configuration
   *
   * @public
   */
  theme: {
    /**
     * Scale of spacer unit
     *
     * @defaultValue 1
     *
     * @public
     */
    spacing: number
    /**
     * Color palette
     *
     * @public
     */
    colors: {
      /**
       * Text color
       *
       * @public
       */
      foreground: TermColor
      /**
       * Grayed out text color
       *
       * @public
       */
      faded: TermColor
      /**
       * Primary color
       *
       * @public
       */
      primary: TermColor
      /**
       * Variant of primary color (for gradients, etc.)
       *
       * @public
       */
      primaryAlt: TermColor
      /**
       * Error color
       *
       * @public
       */
      error: TermColor
      /**
       * Variant of error color (for gradients, etc.)
       *
       * @public
       */
      errorAlt: TermColor
      /**
       * Warning color
       *
       * @public
       */
      warning: TermColor
      /**
       * Success color
       *
       * @public
       */
      success: TermColor
      /**
       * Accent color
       *
       * @public
       */
      accent: TermColor
      /**
       * Flavor color
       *
       * @public
       */
      flavor: TermColor
    }
    /**
     * Interface breakpoints
     *
     * @remarks
     * Expressed as [width, height]
     *
     * @public
     */
    screens: [
      [number, number], // sm
      [number, number], // md
      [number, number], // lg
      [number, number], // xl
    ]
    /**
     * Number of columns (like a bootstrap/960 grid system for web)
     *
     * @public
     */
    columns: number
    /**
     * Maximum width of raw rendered text
     *
     * @public
     */
    maxWidth: number
    /**
     * Maximum height of raw rendered text
     *
     * @public
     */
    maxHeight: number
  }
}

/**
 * @public
 */
export type TermColor =
  | `#${string}`
  | `black`
  | `red`
  | `green`
  | `yellow`
  | `blue`
  | `magenta`
  | `cyan`
  | `white`
  | `gray`
  | `grey`
  | `blackBright`
  | `redBright`
  | `greenBright`
  | `yellowBright`
  | `blueBright`
  | `magentaBright`
  | `cyanBright`
  | `whiteBright`
