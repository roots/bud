import {spawnSync} from 'child_process'

import {IDependencyManager} from './'

export class Yarn implements IDependencyManager {
  public constructor(public path: string = process.cwd()) {}
  public install(dev: boolean, dependency: string): any {
    return spawnSync(
      'yarn',
      ['add', dependency, dev ? '--dev' : null].filter(Boolean),
    )
  }

  public uninstall(dependency: string): any {
    const args = ['remove'].concat(dependency, [
      '--cwd',
      this.path,
    ])

    return spawnSync('yarn', args)
  }
}
