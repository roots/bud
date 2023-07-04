import type {Bud} from '@roots/bud-framework'

import type {parse} from 'node:path'

/**
 * Bud context object
 *
 * @remarks
 * The context object is constructing during bootstrapping. You shouldn't modify
 * or reference this object unless you know what you're doing and are okay with updating
 * your code when the context object changes between releases.
 *
 * @internal
 */
export interface Context {
  /**
   * All received positional arguments
   */
  _?: Record<string, any>

  /**
   * The instance base directory
   *
   * @remarks
   * Set with `--basedir` or `--cwd` CLI flags
   */
  basedir: string

  /**
   * Bin option
   *
   * @remarks
   * Set with `--bin` CLI flag.
   */
  bin?: `bun` | `node` | `ts-node`

  /**
   * Open application in browser when a development build is ran
   *
   * @remarks
   * Set with `--browser` CLI flag.
   */
  browser?: boolean | string

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
   * Cache option
   *
   * @remarks
   * Can be accessed with {@link Bud.cache}
   * Set with `--cache` CLI flag.
   */
  cache?: `filesystem` | `memory` | false | true

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
   * Render dashboard in CLI
   *
   * @remarks
   * Set with `--dashboard` CLI flag.
   */
  dashboard?:
    | {
        assets?: boolean
        compact?: boolean
        entrypoints?: boolean
        server?: boolean
      }
    | false

  /**
   * Debug option
   *
   * @remarks
   * Set with `--debug` CLI flag.
   */
  debug?: boolean

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
   * Devtool option
   *
   * @remarks
   * Set with `--devtool` CLI flag.
   */
  devtool?:
    | `cheap-module-source-map`
    | `cheap-source-map`
    | `eval-cheap-module-source-map`
    | `eval-cheap-source-map`
    | `eval-nosources-cheap-modules-source-map`
    | `eval-nosources-cheap-source-map`
    | `eval-nosources-source-map`
    | `eval-source-map`
    | `eval`
    | `hidden-cheap-module-source-map`
    | `hidden-cheap-source-map`
    | `hidden-nosources-cheap-module-source-map`
    | `hidden-nosources-cheap-source-map`
    | `hidden-nosources-source-map`
    | `hidden-source-map`
    | `inline-cheap-module-source-map`
    | `inline-cheap-source-map`
    | `inline-nosources-cheap-module-source-map`
    | `inline-nosources-cheap-source-map`
    | `inline-nosources-source-map`
    | `inline-source-map`
    | `nosources-cheap-module-source-map`
    | `nosources-cheap-source-map`
    | `source-map`
    | false
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
   * Open editor on error
   *
   * @remarks
   * Set with `--editor` CLI flag.
   */
  editor?: boolean | string
  /**
   * Environment variable data
   *
   * @remarks
   * Can be accessed with {@link Bud.env}, which reads from these records.
   */
  env: Record<string, string>
  /**
   * ESM option
   *
   * @remarks
   * Set with `--esm` CLI flag.
   */
  esm?: boolean
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
   * Config files and directories
   *
   * @remarks
   * Files are sourced from the {@link Context.basedir} and `./config` directories.
   */
  files: Record<string, File>
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

  /**
   * Hash option
   *
   * @remarks
   * Set with the `--hash` CLI flag.
   */
  hash?: boolean

  /**
   * Hot option
   *
   * @remarks
   * Set with the `--hot` CLI flag.
   */
  hot?: boolean

  /**
   * HTML option
   *
   * @remarks
   * Set with the `--html` CLI flag.
   */
  html?: boolean | string

  /**
   * Immutable option
   *
   * @remarks
   * Set with the `--immutable` CLI flag.
   */
  immutable?: boolean

  /**
   * Indicator option
   *
   * @remarks
   * Set with the `--indicator` CLI flag.
   */
  indicator?: boolean

  /**
   * Input option
   *
   * @remarks
   * Set with the `--input` CLI flag.
   */
  input?: string

  /**
   * The instance label
   *
   * @remarks
   * Can be accessed via {@link Bud.label}
   */
  label?: string

  /**
   * Log option
   *
   * @remarks
   * Set with the `--log` CLI flag.
   */
  log?: boolean

  /**
   * The application manifest
   *
   * @remarks
   * Sourced from the `package.json` file in the {@link Context.basedir} directory.
   */
  manifest: Record<string, any>

  /**
   * Minimize option
   *
   * @remarks
   * Set with the `--minimize` CLI flag.
   */
  minimize?: boolean

  /**
   * The build mode
   *
   * @remarks
   * Set with `--mode` CLI flag.
   */
  mode: 'development' | 'production'

  /**
   * Modules option
   *
   * @remarks
   * Set with the `--modules` CLI flag.
   */
  modules?: string

  /**
   * Notify option
   *
   * @remarks
   * Set with the `--notify` CLI flag.
   */
  notify?: boolean

  /**
   * Output directory
   *
   * @remarks
   * Set with `--output` CLI flag.
   */
  output?: string

  /**
   * Overlay option
   *
   * @remarks
   * Set with the `--overlay` CLI flag.
   */
  overlay?: boolean

  /**
   * Initial paths
   *
   * @remarks
   * Use {@link Bud.path} and {@link Bud.setPath} to interact with bud.js paths.
   *
   * @remarks
   * This is a record of paths that are set by default or by flags/env. It is not
   * necesssarily a complete or accurate representation of the paths that are
   * available to bud.js.
   */
  paths?: {
    /**
     * OS reported directory for cache files
     */
    [`os-cache`]: string

    /**
     * OS reported directory for configuration files
     */
    [`os-config`]: string

    /**
     * OS reported directory for cache files
     */
    [`os-data`]: string

    /**
     * OS reported directory for log files
     */
    [`os-log`]: string

    /**
     * OS reported directory for temporary files
     */
    [`os-temp`]: string

    /**
     * Base directory for all paths
     */
    basedir: string

    /**
     * Hash of paths
     */
    hash: string

    /**
     * Directory for temporary files
     *
     * @default os-cache
     */
    storage: string
  }

  /**
   * Port option
   *
   * @remarks
   * Set with the `--port` CLI flag.
   */
  port?: string

  /**
   * Proxy option
   *
   * @remarks
   * Set with the `--proxy` CLI flag.
   */
  proxy?: string

  /**
   * Public path option
   *
   * @remarks
   * Set with the `--publicPath` CLI flag.
   */
  publicPath?: string

  /**
   * Reload option
   *
   * @remarks
   * Set with the `--reload` CLI flag.
   */
  reload?: boolean

  /**
   * Root bud.js instance
   *
   * @remarks
   * In the case of a nested bud.js instance, this will be the parent bud.js instance.
   */
  root?: Bud

  /**
   * Runtime option
   *
   * @remarks
   * Set with the `--runtime` CLI flag.
   */
  runtime?: `multiple` | `single` | boolean

  /**
   * bud.js {@link Service} instances
   *
   * @remarks
   * Services from this array are imported and instantiated during {@link Bud.lifecycle}
   */
  services: Array<string>

  /**
   * Silent option
   *
   * @remarks
   * Set with the `--silent` CLI flag.
   */
  silent?: boolean

  /**
   * Split chunks option
   *
   * @remarks
   * Set with the `--splitChunks` CLI flag.
   */
  splitChunks?: boolean

  /**
   * Stderr stream
   */
  stderr: NodeJS.WriteStream & {fd: 2}

  /**
   * Stdin stream
   */
  stdin: NodeJS.ReadStream & {fd: 0}

  /**
   * Stdout stream
   */
  stdout: NodeJS.WriteStream & {fd: 1}

  /**
   * Storage option
   *
   * @remarks
   * Set with the `--storage` CLI flag.
   */
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
}

/**
 * Virtual file system file
 */
export interface File {
  /**
   * Is a bud configuration file
   *
   * @remarks
   * File name contains `bud`.
   */
  bud: boolean

  /**
   * Is a local configuration file
   *
   * @remarks
   * File name includes `.local`.
   */
  local: boolean

  /**
   * File mode
   */
  mode: number

  /**
   * Module importer
   */
  module: () => Promise<any>

  /**
   * Filename
   */
  name: string

  /**
   * Parsed file path
   */
  parsed: ReturnType<typeof parse>

  /**
   * Absolute filepath
   */
  path: string

  /**
   * SHA1 hash of file contents
   */
  sha1: string

  /**
   * File size
   */
  size: number

  /**
   * Target environment config
   *
   * @remarks
   * File name includes `.production` or `.development`
   */
  target: `base` | `development` | `production`

  /**
   * File type
   */
  type: `file` | `json` | `module`
}
