import type {Bud} from '@roots/bud-framework/bud'
import type {Server} from '@roots/bud-framework/services'
import chokidar from 'chokidar'
import {globby} from 'globby'
import {bind} from 'helpful-decorators'

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
  public instance: chokidar.FSWatcher

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
  public logger: Bud['logger']['instance']

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
   * Get watch options
   *
   * @public
   * @decorator `@bind`
   */
  public getOptions() {
    this.options = this.app.hooks.filter(`dev.watch.options`, {})
    return this.options
  }

  /**
   * Get watched files
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getFiles(): Array<string> {
    this.files = this.app.hooks.filter(`dev.watch.files`, new Set())

    if (this.files.size === 0) return []

    return Array.from(this.files)
  }

  /**
   * Get files
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async search() {
    return await globby(this.getFiles())
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
    const files = await this.search()
    this.files = new Set(files)

    if (files.length < 1) return

    this.instance = chokidar
      .watch(files, this.getOptions())
      .on(`change`, this.watcherCallback)

    this.logger.log(`watching ${this.files.size} files for changes`)

    return this.instance
  }
}
