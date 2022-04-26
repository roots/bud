import {bind, fs, pkgUp} from '@roots/bud-support'
import {dirname, join} from 'node:path'

export class Dir {
  public project: string

  public constructor(public cwd?: string) {}

  public set(dir: 'cwd' | 'project', path: string): this {
    this[dir] = path
    return this
  }

  public async check(path: string): Promise<string | false> {
    const exists = await fs.pathExists(path)
    return exists ? path : false
  }

  @bind
  public async setProject(path: string): Promise<this> {
    const check = await this.check(join(path, 'package.json'))
    if (check) this.project = dirname(check)
    return this
  }

  @bind
  public async find(): Promise<Dir> {
    const cwd = await this.check(this.cwd)
    if (!cwd) throw new Error(`cwd not accessible: ${this.cwd}`)

    await this.setProject(this.cwd)
    if (this.project) return this

    await pkgUp.pkgUp({cwd: this.cwd}).then(dirname).then(this.setProject)
    if (!this.project) {
      throw new Error(
        `Could not find project root (from cwd: ${this.cwd})`,
      )
    }

    return this
  }
}
