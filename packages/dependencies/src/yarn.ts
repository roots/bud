import {spawnSync, SpawnSyncReturns} from 'child_process'
import Dependencies from './dependencies'
import {IDependencyManager} from './'

class Yarn extends Dependencies implements IDependencyManager {
  install(dev: boolean): SpawnSyncReturns<string> {
    const args = ['add'].concat(this.dependencies, [
      '--cwd',
      this.path,
      '--production=false',
    ])
    if (dev) {
      args.push('--dev')
    }

    return spawnSync('yarn', args)
  }

  uninstall(): SpawnSyncReturns<string> {
    const args = ['remove'].concat(this.dependencies, [
      '--cwd',
      this.path,
    ])

    return spawnSync('yarn', args)
  }
}

export {Yarn as default}
