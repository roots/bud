import {lodash} from '@roots/bud-support'
import Webpack from 'webpack'

import {Locations} from './'
import {Framework} from './Framework'
import {Service} from './Service'

const {get, set} = lodash

/**
 * Container store for initial configuration and general options
 *
 * @public
 */
export class Store<T = Store.Repository> extends Service<T> {
  /**
   * Service identifier
   *
   * @public
   */
  public ident: string = 'store'

  /**
   * Store constructor
   *
   * @param app - Framework
   * @param options - Partial framework config
   */
  public constructor(app: Framework, options: Partial<Store.Repository>) {
    super(app)
    this.repository = options
  }

  /**
   * Get a store value
   *
   * @override
   */
  public get<K extends keyof Store.Map & string, T = Store.Map[K]>(
    path: K,
  ): T {
    return get(this.repository, path)
  }

  /**
   * Set a store value
   *
   * @override
   */
  public set<K extends keyof Store.Map & string, T = Store.Map[K]>(
    path: K,
    value: T,
  ) {
    set(this.repository, path, value)
    return this
  }
}

interface CompilerConfig extends Partial<Webpack.Configuration> {
  optimization?: any
  infrastructureLogging?: any
}

export namespace Store {
  /**
   * Framework base configuration
   *
   * @remarks
   * These are just initial values. They can be overwritten by the user, or extended by the framework/modules.
   * It is recommended to use {@link @roots/bud-framework#Hooks.on} to extend the
   *
   * @public
   */
  export interface Repository {
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
       * Enable or disable proxy
       */
      proxy?: boolean

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

  export interface Map
    extends BuildKeyMap,
      RepositoryKeyMap,
      CliKeyMap,
      CliFlagsKeyMap,
      FeaturesKeyMap,
      LocationKeyMap,
      PatternKeyMap,
      ThemeKeyMap,
      ThemeColorsKeyMap {
    ['cache.type']: Repository['cache']['type']
    ['log.level']: Repository['log']['level']
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

  type RepositoryKeyMap = {
    [K in keyof Repository as `${K & string}`]: Repository[K]
  }

  type CliKeyMap = {
    [K in keyof Repository['cli'] as `cli.${K &
      string}`]: Repository['cli'][K]
  }
  type CliFlagsKeyMap = {
    [K in keyof Repository['cli']['flags'] as `cli.flags.${K &
      string}`]: Repository['cli']['flags'][K]
  }

  type FeaturesKeyMap = {
    [K in keyof Repository['features'] as `features.${K &
      string}`]: Repository['features'][K]
  }

  type ThemeKeyMap = {
    [K in keyof Repository['theme'] as `theme.${K &
      string}`]: Repository['theme'][K]
  }

  type ThemeColorsKeyMap = {
    [C in keyof Repository['theme']['colors'] as `theme.colors.${C &
      string}`]: Repository['theme']['colors'][C]
  }

  type LocationKeyMap = {
    [K in keyof Repository['location'] as `location.${K &
      string}`]: Repository['location'][K]
  }

  type PatternKeys =
    | 'js'
    | 'css'
    | 'font'
    | 'image'
    | 'modules'
    | 'html'
    | 'ts'
    | 'sass'
    | 'cssModule'
    | 'sassModule'
    | 'svg'
    | 'vue'
    | 'md'
    | 'json'
    | 'json5'
    | 'toml'
    | 'yml'
    | 'xml'
    | 'csv'
    | 'webp'

  type PatternKeyMap = {
    [K in PatternKeys as `patterns.${K &
      string}`]: Repository['patterns'][K]
  }

  type BuildKeyMap = {
    ['build.bail']: boolean
    [`build.cache`]: any
    ['build.cache.buildDependencies']: Record<string, Array<string>>
    ['build.cache.cacheDirectory']: string
    [`build.cache.version`]: string
    ['build.cache.type']: 'memory' | 'filesystem'
    ['build.cache.managedPaths']: Array<string>
    [`build.context`]: Repository['build']['context']
    [`build.devtool`]: Repository['build']['devtool']
    [`build.entry`]: Repository['build']['entry']
    [`build.experiments`]: Repository['build']['experiments']
    [`build.externals`]: Repository['build']['externals']
    [`build.infrastructureLogging`]: Repository['build']['infrastructureLogging']
    [`build.mode`]: Repository['build']['mode']
    [`build.module`]: Repository['build']['module']
    [`build.name`]: Repository['build']['name']
    [`build.node`]: Repository['build']['node']
    [`build.optimization`]: Repository['build']['optimization']
    [`build.optimization.emitOnErrors`]: Repository['build']['optimization']['emitOnErrors']
    [`build.optimization.minimize`]: Repository['build']['optimization']['minimize']
    [`build.optimization.minimizer`]: Repository['build']['optimization']['minimizer']
    [`build.optimization.moduleIds`]: Repository['build']['optimization']['moduleIds']
    [`build.optimization.removeEmptyChunks`]: Repository['build']['optimization']['removeEmptyChunks']
    [`build.optimization.runtimeChunk`]: Repository['build']['optimization']['runtimeChunk']
    [`build.optimization.splitChunks`]: any
    [`build.output`]: Repository['build']['output']
    [`build.output.assetModuleFilename`]: Repository['build']['output']['assetModuleFilename']
    [`build.output.chunkFilename`]: Repository['build']['output']['chunkFilename']
    [`build.output.clean`]: Repository['build']['output']['clean']
    [`build.output.filename`]: Repository['build']['output']['filename']
    [`build.output.path`]: Repository['build']['output']['path']
    [`build.output.pathinfo`]: Repository['build']['output']['pathinfo']
    [`build.output.publicPath`]: string
    [`build.parallelism`]: Repository['build']['parallelism']
    [`build.performance`]: Repository['build']['performance']
    [`build.profile`]: Repository['build']['profile']
    [`build.recordsPath`]: Repository['build']['recordsPath']
    [`build.resolve`]: Repository['build']['resolve']
    [`build.resolve.alias`]: Record<string, string | false | string[]>
    [`build.resolve.extensions`]: Repository['build']['resolve']['extensions']
    [`build.resolve.modules`]: Repository['build']['resolve']['modules']
    [`build.stats`]: Repository['build']['stats']
    [`build.target`]: Repository['build']['target']
    [`build.watch`]: Repository['build']['watch']
    [`build.watchOptions`]: Repository['build']['watchOptions']
  }
}
