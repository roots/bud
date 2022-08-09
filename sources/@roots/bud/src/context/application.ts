import fs from 'fs-extra'
import {dirname, join, resolve, sep} from 'node:path/posix'
import {fileURLToPath} from 'node:url'

/**
 * Application context
 *
 * @public
 */
export class Application {
  /**
   * Application label
   *
   * @public
   */
  public label: string

  /**
   * Application directory
   *
   * @public
   */
  public basedir: string

  /**
   * Application version
   *
   * @public
   */
  public version: string

  /**
   * Manifest path
   *
   * @public
   */
  public manifestPath: string

  /**
   * Basename
   *
   * @public
   */
  public get dirname(): string {
    const filename = fileURLToPath(import.meta.url)
    return dirname(filename)
  }

  /**
   * Find application manifest
   *
   * @public
   */
  public async find(): Promise<this> {
    this.manifestPath = resolve(
      join(this.dirname, '..', '..', 'package.json'),
    )

    return await this.handleFindResults(this.manifestPath)
  }

  public async handleFindResults(path: string): Promise<this> {
    const manifest = await fs.readJson(path)

    Object.entries(manifest).map(([k, v]) => {
      this[k] = v
    })

    this.label = manifest.name.split(sep).pop()
    this.basedir = dirname(this.manifestPath)

    return this
  }
}
