import {Framework} from '@roots/bud-framework'
import chokidar, {FSWatcher} from 'chokidar'
import globby from 'globby'
import {bind} from 'helpful-decorators'

export class Watcher {
  /**
   * Watcher instance
   *
   * @public
   */
  public instance: FSWatcher

  /**
   * Get watched files
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async getWatchedFiles(): Promise<Array<string>> {
    const {files, options} = this.app.store.get('server.watch')

    if (!files?.length) return []

    const globResults = await globby(
      files.map((file: string) => this.app.path('project', file)),
      options,
    )

    return globResults.map(entry =>
      typeof entry === 'object' ? entry.path : entry,
    )
  }

  /**
   * Class constructor
   *
   * @param app - Application instance
   */
  public constructor(public app: Framework) {}

  /**
   * Initialize watch files
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async watch() {
    const watchFiles = await this.getWatchedFiles()

    if (watchFiles.length) {
      this.instance = chokidar.watch(
        watchFiles.map(entry => {
          this.app.log(`watching`, entry, `for changes`)
          return entry
        }),
      )
    }
  }
}
