import fs from 'fs-extra'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

/**
 * Application context
 *
 * @public
 */
export class Application {
  /**
   * Application name
   *
   * @public
   */
  public name: string

  /**
   * Application label
   *
   * @public
   */
  public label: string

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
   * Application directory
   *
   * @public
   */
  public get dir(): string {
    return dirname(this.manifestPath)
  }

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
    this.manifestPath = resolve(`${this.dirname}/../../package.json`)
    return await this.handleFindResults(this.manifestPath)
  }

  public async handleFindResults(path: string): Promise<this> {
    const manifest = await fs.readJson(path)

    Object.entries(manifest).map(([k, v]) => {
      this[k] = v
    })

    this.label = this.name.split('/').pop()

    return this
  }
}
