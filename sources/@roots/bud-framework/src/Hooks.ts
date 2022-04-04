import {WatchOptions} from 'chokidar'
import {Configuration} from 'webpack'

import {Framework, Locations, Modules, Service} from './'
import {ConfigMap} from './config.map'
import {EntryObject} from './entry'
import * as Server from './Server'

/**
 * Assign and filter callback to values.
 *
 * @example
 * Add a new entry to the `webpack.externals` configuration:
 *
 * ```ts
 * hooks.on(
 *   'build/externals',
 *   externals => ({
 *     ...externals,
 *     $: 'jquery',
 *   }),
 * )
 * ```
 *
 * @example
 * Change the `webpack.output.filename` format:
 *
 * ```ts
 * hooks.on(
 *   'build.output.filename',
 *   () => '[name].[hash:4]',
 * )
 * ```
 *
 * @public
 */
export interface Hooks extends Service {
  /**
   * Register a function to modify a filtered value
   *
   * @example
   * ```js
   * app.hooks.on(
   *   'namespace.name.value',
   *   value => 'replaced by this string',
   * )
   * ```
   *
   * @public
   */
  on<T extends keyof Hooks.Map & string>(
    id: T,
    callback?: ((param?: Hooks.Map[T]) => Hooks.Map[T]) | Hooks.Map[T],
  ): Framework

  /**
   * Register an async function to filter a value.
   *
   * @example
   * ```js
   * app.hooks.on(
   *   'namespace.name.value',
   *   value => 'replaced by this string',
   * )
   * ```
   *
   * @public
   */
  async<T extends keyof Hooks.AsyncMap & string>(
    id: T,
    callback?: (param?: Hooks.AsyncMap[T]) => Promise<Hooks.AsyncMap[T]>,
  ): Framework

  /**
   * Filter a value
   *
   * @example
   * ```js
   * bud.hooks.filter(
   *   'namespace.name.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   *
   * @public
   */
  filter<T extends keyof Hooks.Map & string>(
    id: T,
    value?: Hooks.Map[T] | ((value?: Hooks.Map[T]) => Hooks.Map[T]),
  ): Hooks.Map[T]

  /**
   * Async version of hook.filter
   *
   * @remarks
   * Hooks are processed as a waterfall.
   *
   * @example
   * ```js
   * bud.hooks.filter(
   *   'namespace.name.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   *
   * @public
   */
  filterAsync<T extends keyof Hooks.AsyncMap & string>(
    id: T,
    value?:
      | Hooks.AsyncMap[T]
      | ((param?: Hooks.AsyncMap[T]) => Promise<Hooks.AsyncMap[T]>),
  ): Promise<Hooks.AsyncMap[T]>

  /**
   * Event
   *
   * @public
   */
  fire<T extends keyof Hooks.Events & string>(id: T): Promise<Framework>

  /**
   * Action (on event)
   *
   * @public
   */
  action<T extends keyof Hooks.Events & string>(
    id: T,
    ...action: Array<(app: Framework) => Promise<unknown>>
  ): Framework
}

/**
 * @public
 */
export namespace Hooks {
  /**
   * Hook signature
   *
   * @public
   */
  export type Hook<T extends keyof Map & string> =
    | ((value?: T) => Map[T])
    | ((value?: T) => Partial<Map[T]>)
    | Map[T]
    | Partial<Map[T]>

  /**
   * Event Keys
   */
  interface Keys {
    events: [
      `event.app.close`,
      `event.build.before`,
      `event.build.after`,
      `event.compiler.before`,
      `event.compiler.after`,
      `event.compiler.done`,
      `event.compiler.error`,
      `event.dashboard.q`,
      `event.project.write`,
      `event.run`,
      `event.server.before`,
      `event.server.listen`,
      `event.server.after`,
      `event.proxy.interceptor`,
    ]
  }

  type EventMap = {
    [K in Keys['events'] as `${K & string}`]: (
      app: Framework,
    ) => Promise<any>
  }

  export interface Events extends EventMap {}

  /**
   * Asyncronous hooks map
   *
   * @public
   */
  export interface AsyncMap {
    [`build`]: Record<string, any>
    [`build.entry`]: Record<string, EntryObject>
    [`build.plugins`]: Array<any>
    [`build.resolve`]: Configuration['resolve']
    [`build.resolve.alias`]: Configuration[`resolve`][`alias`]
    [`build.resolve.modules`]: Configuration[`resolve`][`modules`]
  }

  export type LocationKeyMap = {
    [K in keyof Locations as `location.${K & string}`]: Locations[K]
  }

  export type ModuleOptions = {
    [K in keyof Modules as `extension.${K & string}.options`]: Modules[K]['options']
  }

  /**
   * Syncronous hooks map
   *
   * @public
   */
  export interface Map
    extends Server.Middleware.Middleware<`options`>,
    Server.Middleware.Middleware<`factory`>,
    Server.OptionsMap,
    LocationKeyMap,
    ConfigMap,
    ModuleOptions {
    
    /**
     * Dev server connection options
     * @public
     */
    [`dev.options`]: Server.Options

    /**
     * IPV4 or IPV6 binding
     * @public
     */
    [`dev.interface`]: string

    /**
     * Hostname
     * @public
     */
    [`dev.hostname`]: string

    /**
     * Ports to exclude from selection
     */
    [`dev.exclude`]: Array<number>
    /**
     * Ports to prefer
     */
    [`dev.port`]: Array<number>
    /**
     * Should use SSL server
     */
    [`dev.ssl`]: boolean
    /**
     * Files which trigger a full browser reload
     */
    [`dev.watch.files`]: Set<string>
    /**
     * FS.Watcher options
     */
    [`dev.watch.options`]: WatchOptions
    /**
     * Scripts included in dev builds
     */
    [`dev.client.scripts`]: Set<(app: Framework) => string>
    [`middleware.enabled`]: Array<keyof Server.Middleware.Available>
    [`middleware.proxy.target`]: URL
    [`middleware.proxy.replacements`]: Array<[RegExp | string, string]>
    [key: Server.Middleware.OptionsKey]: any
  }
}
