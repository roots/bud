import type {FSWatcher} from 'node:fs'

import type {Bud} from '@roots/bud-framework/bud'
import type {Server} from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators'
import chokidar from 'chokidar'

/**
 * FS Watcher
 *
 * @public
 */
export class Watcher implements Server.Watcher {
  /**
   * Watcher instance
   *
   * @public
   */
  public instance: FSWatcher

  /**
   * Watch files
   *
   * @public
   */
  public files: Set<string>

  /**
   * Watch options
   *
   * @public
   */
  public options: chokidar.WatchOptions

  /**
   * Logger
   *
   * @public
   */
  public logger: any

  /**
   * Class constructor
   *
   * @param app - Application instance
   */
  public constructor(public app: Bud) {
    this.logger = this.app.server.logger.scope(
      ...this.app.logger.scope,
      `server`,
      `watch`,
    )
  }

  /**
   * Watcher callback
   *
   * @param path - changed file
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public watcherCallback(path: string): void {
    this.logger.log(
      `edit to`,
      path.replace(this.app.path(), `.`),
      `triggered reload`,
    )

    this.app.server.appliedMiddleware?.hot?.publish({
      action: `reload`,
      message: `Detected file change: ${path}. Reloading window.`,
    })
  }

  /**
   * Initialize watch files
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async watch(): Promise<Watcher['instance']> {
    if (this.app.context.args.dry) return

    this.files = this.app.hooks.filter(`dev.watch.files`, new Set([]))
    this.options = this.app.hooks.filter(`dev.watch.options`, {
      ignoreInitial: true,
      cwd: this.app.path(),
    })

    if (this.files.size < 1) return

    this.instance = chokidar
      .watch([...this.files], this.options)
      .on(`change`, this.watcherCallback)
      .on(`add`, this.watcherCallback)
      .on(`unlink`, this.watcherCallback)

    this.logger.log(`watching`)

    return this.instance
  }
}
