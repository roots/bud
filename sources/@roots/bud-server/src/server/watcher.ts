import type {Bud} from '@roots/bud-framework'
import type {Server} from '@roots/bud-framework/services'
import type {FSWatcher} from 'node:fs'

import * as chokidar from '@roots/bud-support/chokidar'
import {bind} from '@roots/bud-support/decorators/bind'

/**
 * FS Watcher
 */
export class Watcher implements Server.Watcher {
  /**
   * Watch files
   */
  public files: Set<string>

  /**
   * Watcher instance
   */
  public instance: FSWatcher

  /**
   * Watch options
   */
  public options: chokidar.WatchOptions

  /**
   * Class constructor
   *
   * @param app - Application instance
   */
  public constructor(public _app: () => Bud) {}

  /**
   * App instance
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * Logger
   */
  public get logger(): any {
    return this.app.server.logger.scope(`watcher`)
  }

  /**
   * Initialize watch files
   */
  @bind
  public async watch(): Promise<Watcher['instance']> {
    if (this.app.context.dry) return

    this.files = this.app.hooks.filter(`dev.watch.files`, new Set([]))
    this.options = this.app.hooks.filter(`dev.watch.options`, {
      cwd: this.app.path(),
      ignoreInitial: true,
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

  /**
   * Watcher callback
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
}
