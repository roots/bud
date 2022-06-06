import fs from 'fs-extra'

import {Disk} from './disk.js'

/**
 * Context: project manifest
 *
 * @public
 */
export class Manifest {
  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public disk: Disk) {}

  /**
   * Read manifest
   *
   * @public
   */
  public async read() {
    return await fs.readJson(this.disk.config['package.json'], 'utf8')
  }
}
