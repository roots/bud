import {spawnSync, SpawnSyncReturns} from 'child_process'
import Dependencies from './dependencies'
import {IDependencyManager} from './'

class Npm extends Dependencies implements IDependencyManager {
  install(dev: boolean): SpawnSyncReturns<string> {
    const args = ['install'].concat(this.dependencies, [
      '--prefix',
      this.path,
      '--production=false',
      dev ? '--save-dev' : '--save',
      '-',
    ])

    return spawnSync('npm', args)
  }

  uninstall(): SpawnSyncReturns<string> {
    const args = ['uninstall'].concat(this.dependencies, [
      '--prefix',
      this.path,
    ])
    return spawnSync('npm', args)
  }
}

export {Npm as default}
