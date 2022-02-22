import {Framework} from '@roots/bud-framework'
import {bind, globby} from '@roots/bud-support'
import chokidar, {FSWatcher} from 'chokidar'

export class Watcher {
  /**
   * Watcher instance
   *
   * @public
   */
  public instance: FSWatcher

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
    const {files, options} = this.app.store.get('server.watch')

    if (!files?.length) return []

    return await globby.globby(
      files.map((file: string) => {
        this.app.build.config.resolve.alias &&
          Object.entries(this.app.build.config.resolve.alias).map(
            ([key, value]) => {
              file = file.replace(key, value)
            },
          )

        if (!file.startsWith('/')) file = this.app.path('project', file)

        return file
      }, options),
    )
  }

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
