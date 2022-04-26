import {fs} from '@roots/bud-support'

import {Disk} from './disk'

export class Manifest {
  public constructor(public disk: Disk) {}

  public async read() {
    return await fs.readJson(this.disk.config['package.json'], 'utf8')
  }
}
