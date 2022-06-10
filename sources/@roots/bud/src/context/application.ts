import fs from 'fs-extra'
import {dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {pkgUp} from 'pkg-up'

export interface Application {
  name: string
  label: string
  version: string
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

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
   * Application directory
   *
   * @public
   */
  public dir: string

  public get dirname(): string {
    const filename = fileURLToPath(import.meta.url)
    return dirname(filename)
  }

  /**
   * Find application manifest
   *
   * @public
   */
  public async find(): Promise<Application> {
    const manifestPath = await pkgUp({cwd: this.dirname})

    this.dir = dirname(manifestPath)

    const manifest = await fs.readJson(manifestPath)

    Object.entries(manifest).map(([k, v]) => (this[k] = v))

    this.label = this.name.split('/').pop()

    return this
  }
}
