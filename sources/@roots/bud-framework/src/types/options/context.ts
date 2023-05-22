import type {Bud} from '../../bud.js'
import type {Logger} from '../services/logger/index.js'

/**
 * Bud context object
 */
export interface Context {
  /**
   * argv
   */
  _?: Record<string, any>

  /**
   * Root bud.js instance
   *
   * @remarks
   * In the case of a nested bud.js instance, this will be the parent bud.js instance.
   */
  root?: Bud
  /**
   * Bud.js instance dependencies
   *
   * @remarks
   * In the case of a nested bud.js instance, this will
   * be an array of {@link Bud.label} referencing the parent and previously
   * defined child instances.
   */
  dependsOn?: Array<string>
  /**
   * The instance label
   *
   * @remarks
   * Can be accessed via {@link Bud.label}
   */
  label?: string
  /**
   * The instance base directory
   *
   * @remarks
   * Set with `--basedir` or `--cwd` CLI flags
   */
  basedir: string
  /**
   * The build mode
   *
   * @remarks
   * Set with `--mode` CLI flag.
   */
  mode: 'development' | 'production'
  /**
   * Information on the installed version of bud.js
   */
  bud: {
    /**
     * The name of the bud.js implementation, without the package namespace (e.g. `bud` from `@roots/bud`)
     */
    label: string
    /**
     * Path to the bud.js package.json file
     */
    manifestPath: string
    /**
     * The version of the bud.js implementation
     */
    version: string
  }
  /**
   * Config files and directories
   *
   * @remarks
   * Files are sourced from the {@link Context.basedir} and `./config` directories.
   */
  files: Record<string, File>

  /**
   * Environment variable data
   *
   * @remarks
   * Can be accessed with {@link Bud.env}, which reads from these records.
   */
  env: Record<string, string>

  /**
   * Extension data
   *
   * @remarks
   * Can be accessed with {@link Bud.extensions} which reads from these records.
   */
  extensions: {
    /**
     * Built-in extensions (always loaded)
     */
    builtIn: Array<string>
    /**
     * Discovered extensions (loaded unless `--no-discover` flag is set)
     */
    discovered: Array<string>
  }
  /**
   * The application manifest
   *
   * @remarks
   * Sourced from the `package.json` file in the {@link Context.basedir} directory.
   */
  manifest: Record<string, any>
  /**
   * bud.js {@link Service} instances
   *
   * @remarks
   * Services from this array are imported and instantiated during {@link Bud.lifecycle}
   */
  services: Array<string>
  /**
   * Logger instance
   *
   * @remarks
   * Can be accessed with {@link Bud.log}, {@link Bud.info}, etc.
   */
  logger: Logger

  /**
   * Initial paths
   *
   * @remarks
   * Use {@link Bud.path} and {@link Bud.setPath} to interact with bud.js paths.
   *
   * This is a record of paths that are set by default or by flags/env. It is not
   * necesssarily a complete or accurate representation of the paths that are
   * available to bud.js.
   */
  paths?: {
    /**
     * Hash of paths
     */
    hash: string

    /**
     * Base directory for all paths
     */
    basedir: string

    /**
     * Directory for temporary files
     * @default os-cache
     */
    storage: string

    /**
     * OS reported directory for cache files
     */
    [`os-data`]: string

    /**
     * OS reported directory for configuration files
     */
    [`os-config`]: string

    /**
     * OS reported directory for cache files
     */
    [`os-cache`]: string

    /**
     * OS reported directory for log files
     */
    [`os-log`]: string

    /**
     * OS reported directory for temporary files
     */
    [`os-temp`]: string
  }

  /**
   * Open application in browser when a development build is ran
   *
   * @remarks
   * Set with `--browser` CLI flag.
   */
  browser?: string | boolean
  /**
   * Cache option
   *
   * @remarks
   * Can be accessed with {@link Bud.cache}
   * Set with `--cache` CLI flag.
   */
  cache?: `filesystem` | `memory` | true | false
  /**
   * CI option
   *
   * @remarks
   * Set with `--ci` CLI flag.
   */
  ci?: boolean
  /**
   * Clean option
   *
   * @remarks
   * Set with `--clean` CLI flag.
   */
  clean?: boolean
  /**
   * Debug option
   *
   * @remarks
   * Set with `--debug` CLI flag.
   */
  debug?: boolean
  /**
   * Devtool option
   *
   * @remarks
   * Set with `--devtool` CLI flag.
   */
  devtool?:
    | false
    | `eval`
    | `eval-cheap-source-map`
    | `eval-cheap-module-source-map`
    | `eval-source-map`
    | `cheap-source-map`
    | `cheap-module-source-map`
    | `source-map`
    | `inline-cheap-source-map`
    | `inline-cheap-module-source-map`
    | `inline-source-map`
    | `eval-nosources-cheap-source-map`
    | `eval-nosources-cheap-modules-source-map`
    | `eval-nosources-source-map`
    | `inline-nosources-cheap-source-map`
    | `inline-nosources-cheap-module-source-map`
    | `inline-nosources-source-map`
    | `nosources-cheap-source-map`
    | `nosources-cheap-module-source-map`
    | `hidden-nosources-cheap-source-map`
    | `hidden-nosources-cheap-module-source-map`
    | `hidden-nosources-source-map`
    | `hidden-cheap-source-map`
    | `hidden-cheap-module-source-map`
    | `hidden-source-map`
  /**
   * Discover option
   *
   * @remarks
   * Set with `--no-discover` CLI flag.
   */
  discover?: boolean
  /**
   * Dry option
   *
   * @remarks
   * Set with `--dry` CLI flag.
   */
  dry?: boolean
  /**
   * Output directory
   *
   * @remarks
   * Set with `--output` CLI flag.
   */
  output?: string
  /**
   * Open editor on error
   *
   * @remarks
   * Set with `--editor` CLI flag.
   */
  editor?: string | boolean
  /**
   * ESM option
   *
   * @remarks
   * Set with `--esm` CLI flag.
   */
  esm?: boolean
  /**
   * Filter option
   *
   * @remarks
   * In the case of a nested bud.js instance, this will limit the instances
   * that are compiled to those that match the filter. Keyed by {@link Bud.label}.
   *
   * Set with `--filter` CLI flag.
   */
  filter?: Array<string>
  /**
   * Force option
   *
   * @remarks
   * Set with the `--force` CLI flag.
   */
  force?: boolean
  hash?: boolean
  hot?: boolean
  html?: boolean | string
  immutable?: boolean
  indicator?: boolean
  input?: string
  log?: boolean
  minimize?: boolean
  modules?: string
  /**
   * Notify option
   *
   * @remarks
   * Set with the `--notify` CLI flag.
   */
  notify?: boolean
  overlay?: boolean
  publicPath?: string
  port?: string
  proxy?: string
  reload?: boolean
  runtime?: `single` | `multiple` | boolean
  splitChunks?: boolean
  storage?: string
  /**
   * Target option
   *
   * @todo Is this used anywhere?
   */
  target?: Array<string>
  /**
   * Use option
   *
   * @remarks
   * Additional extensions to load.
   *
   * Set with the `--use` CLI flag.
   */
  use?: Array<string>
  /**
   * Verbose logging option
   *
   * @remarks
   * Set with `--verbose` CLI flag.
   */
  verbose?: boolean
  /**
   * Bin option
   *
   * @remarks
   * Set with `--bin` CLI flag.
   */
  bin?: `node` | `ts-node` | `bun`
}

/**
 * Virtual file system file
 */
export interface File {
  name: string
  path: string
  bud: boolean
  local: boolean
  dynamic: boolean
  extension: string | null
  type: `production` | `development` | `base`
  module: any
  file: boolean
  dir: boolean
  symlink: boolean
  size: number
  sha1: string
  mode: number
}
