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
    if (files.size === 0) return []

    return await globby.globby(
      Array.from(files),
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
    const {info} = this.app.logger.instance.scope('watch')
    const watchFiles = await this.getWatchedFiles()

    if (!watchFiles.length) return

    info(`watching ${watchFiles.length} files for changes`)

    this.instance = chokidar.watch(watchFiles).on('change', path => {
      info(
        'edit to',
        path.replace(this.app.path(), '[project]'),
        'triggered reload',
      )

      this.app.server.appliedMiddleware?.hot?.publish({
        action: 'reload',
        message: `Detected file change: ${path}. Reloading window.`,
      })
    })

    return this.instance
  }
}
