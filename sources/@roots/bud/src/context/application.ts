import {fs, pkgUp} from '@roots/bud-support'
import {dirname} from 'node:path'

export interface Application {
  name: string
  label: string
  version: string
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

export class Application {
  public name: string

  public label: string

  public version: string

  public dir: string

  public async find(): Promise<Application> {
    const manifestPath = await pkgUp.pkgUp({cwd: __dirname})

    this.dir = dirname(manifestPath)

    const manifest = await fs.readJson(manifestPath)

    Object.entries(manifest).map(([k, v]) => (this[k] = v))

    this.label = this.name.split('/').pop()

    return this
  }
}
