import {bind} from '@roots/bud-support/decorators'
import {json} from '@roots/bud-support/filesystem'
import fs from '@roots/bud-support/fs-jetpack'
import {dirname, join, resolve, sep} from 'node:path'
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

    const manifest = await json.read(
      fs.cwd(this.data.basedir).path(`package.json`),
    )

    this.data.label = manifest.name.split(sep).pop()
    this.data.version = manifest.version

    return this
  }
}
