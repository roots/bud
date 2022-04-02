import {pkgUp} from '@roots/bud-support'
import {dirname} from 'node:path'

export class Dir {
  public projectDir: string

  public constructor(public cwd: string) {}

  public async find(): Promise<Dir> {
    const packageJson = await pkgUp.pkgUp({cwd: this.cwd})
    this.projectDir = dirname(packageJson)

    return this
  }
}
