import {fs, pkgUp} from '@roots/bud-support'
import {dirname} from 'node:path'

export interface Application {
  name: string
  version: string
}

export class Application {
  public name: string

  public dir: string

  public version: string

  public async find(): Promise<Application> {
    const manifestPath = await pkgUp.pkgUp({cwd: __dirname})
    this.dir = dirname(manifestPath)

    const manifest = await fs.readJson(manifestPath)

    Object.entries(manifest).map(([k, v]) => {
      this[k] = v
    })
    return this
  }
}
