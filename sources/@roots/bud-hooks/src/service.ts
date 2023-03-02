import {Bud, Hooks as Service, Service as Base} from '@roots/bud-framework'

import {AsyncHooks} from './async/async.js'
import {EventHooks} from './event/event.js'
import {SyncHooks} from './sync/sync.js'

/**
 * Hooks and events registry
 *
 * @remarks
 * Supports async and sync value hooks as well as asyncronous events.
 *
 * @example
 * Add a new entry to the `webpack.externals` configuration:
 *
 * ```ts
 * hooks.on(
 *   'build.externals',
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
 * @example
 * Filter a value through any registered hooks:
 *
 * ```ts
 * hooks.filter('build.output.filename', DEFAULT_VALUE)
 * ```
 *
 * @example
 * Filter an async value through any registered hooks:
 *
 * ```ts
 * await hooks.filterAsync('my-event-name', async () => DEFAULT_VALUE)
 * ```
 */
export class Hooks extends Base implements Service {
  public asyncStore: AsyncHooks

  public events: EventHooks

  public syncStore: SyncHooks

  public on: SyncHooks[`set`]

  public filter: SyncHooks['get']

  public fromMap: SyncHooks['setRecords']

  public hasSyncHook: SyncHooks['has']

  public hasAsyncHook: AsyncHooks['has']

  public hasEvent: EventHooks['has']

  public async: AsyncHooks['set']

  public filterAsync: AsyncHooks['get']

  public fromAsyncMap: AsyncHooks['setRecords']

  public action: EventHooks['set']

  public fire: EventHooks['get']

  public constructor(app: () => Bud) {
    super(app)

    this.syncStore = new SyncHooks(app)

    this.on = this.syncStore.set
    this.hasSyncHook = this.syncStore.has
    this.filter = this.syncStore.get
    this.fromMap = this.syncStore.setRecords

    this.asyncStore = new AsyncHooks(app)
    this.async = this.asyncStore.set
    this.filterAsync = this.asyncStore.get
    this.fromAsyncMap = this.asyncStore.setRecords

    this.events = new EventHooks(app)
    this.action = this.events.set.bind(this.events.set)
    this.fire = this.events.get.bind(this.events.get)
  }
}
