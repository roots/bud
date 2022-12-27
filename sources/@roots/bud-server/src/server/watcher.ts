import type {FSWatcher} from 'node:fs'

import type {Logger} from '@roots/bud-framework'
import type {Bud} from '@roots/bud-framework/bud'
import type {Server} from '@roots/bud-framework/services'
import chokidar from '@roots/bud-support/chokidar'
import {bind} from '@roots/bud-support/decorators'

/**
 * FS Watcher
 *
 * @public
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
  public logger: Logger

  /**
   * Class constructor
   *
   * @param app - Application instance
   */
  public constructor(public _app: () => Bud) {
    this.logger = this.app.server.logger.make(this.app.label, `watch`)
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
