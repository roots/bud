import type {FSWatcher} from 'node:fs'

import type {Bud} from '@roots/bud-framework/bud'
import type {Server} from '@roots/bud-framework/services'
import chokidar from '@roots/bud-support/chokidar'
import {bind} from '@roots/bud-support/decorators'

/**
 * FS Watcher
 */
export class Watcher implements Server.Watcher {
  /**
   * App instance
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * Watcher instance
   */
  public instance: FSWatcher

  /**
   * Watch files
   */
  public files: Set<string>

  /**
   * Watch options
   */
  public options: chokidar.WatchOptions

  /**
   * Logger
   */
  public get logger(): any {
    return this.app.server.logger.scope(`watcher`)
  }

  /**
   * Class constructor
   *
   * @param app - Application instance
   */
  public constructor(public _app: () => Bud) {}

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

  /**
   * Initialize watch files
   */
  @bind
  public async watch(): Promise<Watcher['instance']> {
    if (this.app.isCLI() && this.app.context.args.dry) return

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
