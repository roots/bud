import {spawnSync} from 'child_process'
import {IDependencyManager} from './'
import Yarn from './yarn'
import Npm from './npm'

class Dependencies {
  protected dependencies: string[]
  protected path: string

  constructor(
    dependencies: string | string[],
    path: string = process.cwd(),
  ) {
    this.dependencies = [].concat(dependencies as any)
    this.path = path
  }

  get client(): IDependencyManager {
    if (this.isYarn()) {
      return new Yarn(this.dependencies, this.path)
    }

    return new Npm(this.dependencies, this.path)
  }

  protected isYarn(): boolean {
    try {
      // user could have yarn installed, but not be using it
      // this will return false if the user isn't actually using yarn
      if (
        !process.env.npm_execpath ||
        process.env.npm_execpath.indexOf('yarn') === -1
      ) {
        return false
      }
      // test to be sure yarn can be spawned
      spawnSync('command -v yarn >/dev/null')
      return true
    } catch (e) {}

    return false
  }
}

export default Dependencies
