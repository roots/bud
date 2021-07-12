import {Hooks, Server} from '../'
import Webpack from 'webpack/types'

export interface Configuration {
  /**
   * Application name
   */
  name: string

  /**
   * Shared regular expressions for pattern matching.
   *
   * @example
   *
   * ```js
   * app.patterns.get('js')
   * ```
   */
  patterns: {[key: string]: RegExp}

  /**
   * Location
   */
  location: Hooks.Locale.Definitions

  /**
   * Feature: CI mode
   *
   * @default false
   */
  ci: boolean

  /**
   * Feature: Clean dist before compilation
   *
   * When enabled stale assets will be removed from
   * the `location/dist` directory prior to the next
   * compilation.
   *
   * @default true
   */
  clean: boolean

  /**
   * Feature: produce webpack.debug.js artifact
   *
   * When enabled a `webpack.debug.js` artifact will be
   * emitted to the `location/storage` directory.
   *
   * @default false
   */
  debug: boolean

  /**
   * Discover: automatically register locatable extensions
   *
   * When enabled, any discovered extensions will be automatically
   * initialized.
   *
   * @default false
   */
  discover: boolean

  /**
   * Feature: enable filename hashing
   * @default false
   */
  hash: boolean

  /**
   * Feature: emit html template
   * @default true
   */
  html: boolean

  /**
   * Feature: automatically install extension dependencies
   * @default false
   */
  install: boolean

  /**
   * Feature: log to console
   * @default false
   */
  log: boolean

  /**
   * Feature: produce asset manifest
   * @default true
   */
  manifest: boolean

  /**
   * Feature: minimize enabled
   * @default true
   */
  minimize: boolean

  /**
   * File format
   *
   * @note do not include extension
   * @default '[name]'
   */
  fileFormat: string

  /**
   * File format (when hashing is enabled)
   *
   * @note do not include extension
   * @default '[name].[contenthash:6]'
   */
  hashFormat: string

  /**
   * Seed values for webpack config
   */
  build: Webpack.Configuration

  /**
   * Seed values for extension options
   */
  extension: {
    [key: string]: any
  }

  /**
   * Server config
   */
  server: Server['config']['repository']

  /**
   * Theme configuration
   */
  theme: {
    spacing: number // number of chars to use for gutters, spacers, etc.
    colors: {
      foreground: TermColor // text color
      faded: TermColor // 'grayed out' color
      primary: TermColor // primary color
      primaryAlt: TermColor // variant of primary color (for gradients, etc.)
      error: TermColor // error color
      errorAlt: TermColor // variant of error color (for gradients, etc.)
      warning: TermColor // warning color
      success: TermColor // success color
      accent: TermColor // accent color
      flavor: TermColor // flavor color
    }
    screens: [
      [number, number], // sm
      [number, number], // md
      [number, number], // lg
      [number, number], // xl
    ]
    columns: number // col system to use
    maxWidth: number // max width of terminal output
    maxHeight: number // max height of terminal output
  }
}

/**
 * Can be either ansi-color or hex
 */
type TermColor =
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
