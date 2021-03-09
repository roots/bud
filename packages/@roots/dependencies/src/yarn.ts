import {spawnSync, SpawnSyncReturns} from 'child_process'
import {IDependencyManager} from './'

export class Yarn implements IDependencyManager {
  public path: string

  constructor(path: string = process.cwd()) {
    this.path = path
  }

  install(
    dev: boolean,
    dependency: string,
  ): SpawnSyncReturns<string> {
    const args = ['add'].concat(dependency, [
      '--cwd',
      this.path,
      '--production=false',
    ])
    if (dev) {
      args.push('--dev')
    }

    return spawnSync('yarn', args)
  }

  uninstall(dependency: string): SpawnSyncReturns<string> {
    const args = ['remove'].concat(dependency, [
      '--cwd',
      this.path,
    ])

    return spawnSync('yarn', args)
  }
}
