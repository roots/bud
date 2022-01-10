import {IncomingMessage, ServerResponse} from 'http'
import {ValueOf} from 'type-fest'
import {Configuration, RuleSetRule, Stats, StatsCompilation} from 'webpack'

import {Framework, Modules, Plugins, Service} from './'
import {ProxyOptions} from './Server'

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
    callback?: (param?: Hooks.Map[T]) => Hooks.Map[T],
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
  async<T extends keyof Hooks.Map & string>(
    id: T,
    callback?: (param?: Hooks.Map[T]) => Promise<Hooks.Map[T]>,
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
  filterAsync<T extends keyof Hooks.Map & string>(
    id: T,
    value?:
      | Hooks.Map[T]
      | ((param?: Hooks.Map[T]) => Promise<Hooks.Map[T]>),
  ): Promise<Hooks.Map[T]>
}

/**
 * @public
 */
export namespace Hooks {
  /**
   * Bud does not support all the entry types of Webpack
   */
  type LimitedEntryObject = Record<
    string,
    {
      import?: string[]
      dependsOn?: string[]
    }
  >

  /**
   * Same with plugins
   */
  type LimitedPlugin = Array<{apply: any}>

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

  export interface Map {
    [`build`]: Record<string, any>
    [`build.bail`]: boolean
    [`build.cache`]: any
    ['build.cache.buildDependencies']: Record<string, Array<string>>
    ['build.cache.cacheDirectory']: string
    [`build.cache.version`]: string
    ['build.cache.type']: 'memory' | 'filesystem'
    ['build.cache.managedPaths']: Array<string>
    [`build.context`]: Configuration['context']
    [`build.devtool`]: Configuration['devtool']
    [`build.entry`]: LimitedEntryObject
    [`build.experiments`]: Configuration['experiments']
    [`build.externals`]: Configuration['externals']
    [`build.infrastructureLogging`]: Configuration['infrastructureLogging']
    [`build.mode`]: Configuration['mode']
    [`build.module`]: Configuration['module']
    [`build.module.rules`]: Configuration['module']['rules']
    [`build.module.rules.oneOf`]: Array<RuleSetRule>
    [`build.module.rules.before`]: Array<RuleSetRule>
    [`build.module.rules.after`]: Array<RuleSetRule>
    [`build.name`]: Configuration['name']
    [`build.node`]: Configuration['node']
    [`build.optimization`]: Configuration['optimization']
    [`build.optimization.emitOnErrors`]: Configuration['optimization']['emitOnErrors']
    [`build.optimization.minimize`]: Configuration['optimization']['minimize']
    [`build.optimization.minimizer`]: Configuration['optimization']['minimizer']
    [`build.optimization.moduleIds`]: Configuration['optimization']['moduleIds']
    [`build.optimization.removeEmptyChunks`]: Configuration['optimization']['removeEmptyChunks']
    [`build.optimization.runtimeChunk`]: Configuration['optimization']['runtimeChunk']
    [`build.optimization.splitChunks`]: any
    [`build.output`]: Configuration['output']
    [`build.output.assetModuleFilename`]: Configuration['output']['assetModuleFilename']
    [`build.output.chunkFilename`]: Configuration['output']['chunkFilename']
    [`build.output.clean`]: Configuration['output']['clean']
    [`build.output.filename`]: Configuration['output']['filename']
    [`build.output.path`]: Configuration['output']['path']
    [`build.output.pathinfo`]: Configuration['output']['pathinfo']
    [`build.output.publicPath`]: string
    [`build.parallelism`]: Configuration['parallelism']
    [`build.performance`]: Configuration['performance']
    [`build.plugins`]: LimitedPlugin
    [`build.profile`]: Configuration['profile']
    [`build.recordsPath`]: Configuration['recordsPath']
    [`build.resolve`]: Configuration['resolve']
    [`build.resolve.alias`]: {
      [index: string]: string | false | string[]
    }
    [`build.resolve.extensions`]: Configuration['resolve']['extensions']
    [`build.resolve.modules`]: Configuration['resolve']['modules']
    [`build.stats`]: Configuration['stats']
    [`build.target`]: Configuration['target']
    [`build.watch`]: Configuration['watch']
    [`build.watchOptions`]: Configuration['watchOptions']
    [`extension`]: ValueOf<Plugins> | ValueOf<Modules>
    [`location.src`]: string
    [`location.dist`]: string
    [`location.project`]: string
    [`location.modules`]: string
    [`location.storage`]: string
    [`config.override`]: Configuration[]
    [`event.app.close`]: unknown
    [`event.build.make.before`]: unknown
    [`event.build.make.after`]: unknown
    [`event.build.override`]: Configuration
    [`event.compiler.before`]: Array<Framework>
    [`event.compiler.done`]: Stats
    [`event.compiler.after`]: Framework
    [`event.compiler.stats`]: StatsCompilation
    [`event.compiler.error`]: Error
    [`event.dashboard.done`]: void
    [`event.dashboard.q`]: void
    [`event.dashboard.c`]: void
    [`event.project.write`]: Framework['project']
    [`event.server.listen`]: Framework['server']
    [`event.server.before`]: Framework
    [`event.server.after`]: Framework
    [`event.run`]: Framework
    [`proxy.target`]: string
    [`proxy.interceptor`]: (
      buffer: Buffer,
      proxyRes: IncomingMessage,
      req: IncomingMessage,
      res: ServerResponse,
    ) => Promise<Buffer | string>
    [`proxy.replace`]: Array<[string | RegExp, string]>
    [`proxy.options`]?: ProxyOptions
    [`server.inject`]?: Array<(app: Framework) => string>
    [`server.middleware`]?: Record<
      string,
      (app: Framework) => Express.Response
    >

    // this is wack
    [key: `extension.${string}`]: any
  }
}
