import * as Webpack from 'webpack'

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
   * Shared regular expressions for pattern matching.
   *
   * @example
   * ```js
   * app.patterns.get('js')
   * ```
   *
   * @public
   */
  patterns: Index<RegExp>

  /**
   * Registered fs directories
   *
   * @public
   */
  location: Locations

  /**
   * Feature toggle: enable or disable the command line interface
   *
   * @defaultValue true
   *
   * @public
   */
  ci: boolean

  /**
   * Feature toggle: Clean dist before compilation
   *
   * When enabled stale assets will be removed from
   * the `location/dist` directory prior to the next
   * compilation.
   *
   * @defaultValue true
   *
   * @public
   */
  clean: boolean

  /**
   * Feature: produce webpack.debug.js artifact
   *
   * When enabled a `webpack.debug.js` artifact will be
   * emitted to the `location/storage` directory.
   *
   * @defaultValue true
   *
   * @public
   */
  debug: boolean

  /**
   * Discover: automatically register locatable extensions
   *
   * When enabled, any discovered extensions will be automatically
   * initialized.
   *
   * @defaultValue false
   *
   * @public
   */
  discover: boolean

  /**
   * Enable or disable filename hashing
   *
   * @defaultValue false
   *
   * @public
   */
  hash: boolean

  /**
   * Emit html template
   *
   * @defaultValue true
   *
   * @public
   */
  html: boolean

  /**
   * Automatically install peer dependencies
   *
   * @defaultValue false
   *
   * @public
   */
  install: boolean

  /**
   * Log to console
   *
   * @defaultValue false
   *
   * @public
   */
  log: boolean

  /**
   * Enable or disable producing a manifest.json file
   *
   * @defaultValue true
   *
   * @public
   */
  manifest: boolean

  /**
   * Enable or disable chunk splitting
   *
   * @defaultValue false
   *
   * @public
   */
  splitChunks: boolean

  /**
   * File format
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
   * Initial webpack configuration values
   *
   * @public
   */
  build: CompilerConfig

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
