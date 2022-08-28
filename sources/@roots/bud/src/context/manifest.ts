import fs from 'fs-extra'
import {bind} from 'helpful-decorators'

import type Config from './config.js'

/**
 * Context: project manifest
 *
 * @public
 */
export default class Manifest {
  public data: Record<string, any> = {}

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public config: Config) {}

  /**
   * Read manifest
   *
   * @public
   */
  @bind
  public async read() {
    if (!this.config[`package.json`]) return this

    this.data = await fs.readJson(
      this.config.data[`package.json`].path,
      `utf8`,
    )
    this.config.data[`package.json`].module = this.data

    return this
  }
}
