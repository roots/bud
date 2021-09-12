import type * as Webpack from 'webpack'

import type {Framework, Server} from '.'

/**
 * Framework base configuration
 *
 * @remarks
 * These are just initial values. They can be overwritten by the user, or extended by the framework/modules.
 * It is recommended to use hooks to extend the configuration.
 *
 * @public
 */
interface Configuration {
  /**
   * Application name
   */
  name: string

  /**
   * Shared regular expressions for pattern matching.
   *
   * @example
   * ```js
   * app.patterns.get('js')
   * ```
   */
  patterns: {[key: string]: RegExp}

  /**
   * Registered fs directories
   */
  location: Framework.Locations

  /**
   * Enable or disable the command line interface
   *
   * @defaultValue true
   */
  cli: boolean

  /**
   * Feature: Clean dist before compilation
   *
   * When enabled stale assets will be removed from
   * the `location/dist` directory prior to the next
   * compilation.
   *
   * @defaultValue true
   */
  clean: boolean

  /**
   * Feature: produce webpack.debug.js artifact
   *
   * When enabled a `webpack.debug.js` artifact will be
   * emitted to the `location/storage` directory.
   *
   * @defaultValue true
   */
  debug: boolean

  /**
   * Discover: automatically register locatable extensions
   *
   * When enabled, any discovered extensions will be automatically
   * initialized.
   *
   * @defaultValue false
   */
  discover: boolean

  /**
   * Enable or disable filename hashing
   *
   * @defaultValue false
   */
  hash: boolean

  /**
   * Emit html template
   *
   * @defaultValue true
   */
  html: boolean

  /**
   * Automatically install peer dependencies
   *
   * @defaultValue false
   */
  install: boolean

  /**
   * Log to console
   *
   * @defaultValue false
   */
  log: boolean

  /**
   * Enable or disable producing a manifest.json file
   *
   * @defaultValue true
   */
  manifest: boolean

  /**
   * Enable or disable file minification
   *
   * @defaultValue true
   */
  minimize: boolean

  /**
   * File format
   *
   * @remarks
   * do not include extension
   *
   * @defaultValue '[name]'
   */
  fileFormat: string

  /**
   * File format when hashing is enabled
   *
   * @remarks
   * do not include extension
   *
   * @defaultValue '[name].[contenthash:6]'
   */
  hashFormat: string

  /**
   * Initial webpack configuration values
   */
  build: Webpack.Configuration

  /**
   * Initial options for registered extensions
   */
  extension: {[key: string]: any}

  /**
   * Server configuration
   */
  server: Server.Configuration

  /**
   * Command line theme configuration
   */
  theme: {
    /**
     * width/height of spacer units
     */
    spacing: number
    /**
     * Color palette
     */
    colors: {
      /**
       * Text color
       */
      foreground: Configuration.TermColor
      /**
       * Grayed out text color
       */
      faded: Configuration.TermColor
      /**
       * Primary color
       */
      primary: Configuration.TermColor
      /**
       * Variant of primary color (for gradients, etc.)
       */
      primaryAlt: Configuration.TermColor
      /**
       * Error color
       */
      error: Configuration.TermColor
      /**
       * Variant of error color (for gradients, etc.)
       */
      errorAlt: Configuration.TermColor
      /**
       * Warning color
       */
      warning: Configuration.TermColor
      /**
       * Success color
       */
      success: Configuration.TermColor
      /**
       * Accent color
       */
      accent: Configuration.TermColor
      /**
       * Flavor color
       */
      flavor: Configuration.TermColor
    }
    /**
     * Interface breakpoints
     *
     * @remarks
     * Expressed as [width, height]
     */
    screens: [
      [number, number], // sm
      [number, number], // md
      [number, number], // lg
      [number, number], // xl
    ]
    /**
     * Number of columns (like a bootstrap/960 grid system for web)
     */
    columns: number
    /**
     * Maximum width of raw rendered text
     */
    maxWidth: number
    /**
     * Maximum height of raw rendered text
     */
    maxHeight: number
  }
}

namespace Configuration {
  /**
   * Can be either ansi-color or hex
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
}

export {Configuration}
