import {Framework, Server} from '@roots/bud-framework'
import {bind, chokidar, globby} from '@roots/bud-support'

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
   * Class constructor
   *
   * @param app - Application instance
   */
  public constructor(public app: Framework) {}

  /**
   * Get watched files
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async getWatchedFiles(): Promise<Array<string>> {
    const files = this.app.hooks.filter('dev.watch.files')
    if (!files.size) return []

    return await globby.globby(
      Array.from(files).map((file: string) =>
        this.app.path('project', file),
      ),
      this.app.hooks.filter('dev.watch.options'),
    )
  }

  /**
   * Initialize watch files
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async watch(): Promise<Watcher['instance']> {
    const watchFiles = await this.getWatchedFiles()

    if (watchFiles.length) {
      this.instance = chokidar.watch(
        watchFiles.map(entry => {
          this.app.log(`watching`, entry, `for changes`)
          return entry
        }),
      )
    }

    this.instance.on('change', path => {
      this.app.server.enabledMiddleware?.hot?.publish({
        action: 'reload',
        message: `Detected file change: ${path}. Reloading window.`,
      })
    })

    return this.instance
  }
}
