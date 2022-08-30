import fs from 'fs-extra'
import {bind} from 'helpful-decorators'
import {dirname, join, resolve, sep} from 'node:path/posix'
import {fileURLToPath} from 'node:url'

/**
 * Application context
 *
 * @public
 */
export default class Bud {
  public data: {
    label: string
    basedir: string
    version: string
    manifestPath: string
  } = {
    label: null,
    basedir: null,
    version: null,
    manifestPath: null,
  }

  /**
   * Find application manifest
   *
   * @public
   */
  @bind
  public async find(): Promise<this> {
    this.data.basedir = dirname(fileURLToPath(import.meta.url))
    this.data.manifestPath = resolve(
      join(this.data.basedir, `..`, `..`, `package.json`),
    )
    await this.handleFindResults(this.data.manifestPath)
    return this
  }

  /**
   * Handle file results
   *
   * @public
   */
  @bind
  public async handleFindResults(path: string): Promise<this> {
    const manifest = await fs.readJson(path)

    this.data.label = manifest.name.split(sep).pop()
    this.data.version = manifest.version

    return this
  }
}
