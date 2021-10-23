import {spawnSync} from 'child_process'

import {IDependencyManager} from './'

export class Npm implements IDependencyManager {
  public constructor(public path: string = process.cwd()) {}

  public install(dev: boolean, dependency: string): any {
    const args = ['install'].concat(dependency, [
      '--prefix',
      this.path,
      '--production=false',
      dev ? '--save-dev' : '--save',
      '-',
    ])

    return spawnSync('npm', args)
  }

  public uninstall(dependency: string): any {
    const args = ['uninstall'].concat(dependency, [
      '--prefix',
      this.path,
    ])
    return spawnSync('npm', args)
  }
}
