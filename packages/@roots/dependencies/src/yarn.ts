import {spawnSync, SpawnSyncReturns} from 'child_process'
import {IDependencyManager} from './'

export class Yarn implements IDependencyManager {
  public path: string

  public constructor(path: string = process.cwd()) {
    this.path = path
  }

  public install(
    dev: boolean,
    dependency: string,
  ): SpawnSyncReturns<string> {
    return spawnSync(
      'yarn',
      ['add', dependency, dev ? '--dev' : null].filter(Boolean),
    )
  }

  public uninstall(
    dependency: string,
  ): SpawnSyncReturns<string> {
    const args = ['remove'].concat(dependency, [
      '--cwd',
      this.path,
    ])

    return spawnSync('yarn', args)
  }
}
