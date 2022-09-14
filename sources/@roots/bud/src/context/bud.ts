import {bind} from '@roots/bud-support/decorators'
import * as fs from '@roots/bud-support/fs'
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
    const resolvedPath = dirname(fileURLToPath(import.meta.url))
    this.data.manifestPath = resolve(
      join(resolvedPath, `..`, `..`, `package.json`),
    )
    this.data.basedir = dirname(resolve(this.data.manifestPath))
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
