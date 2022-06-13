import {bind} from 'helpful-decorators'

import type {IDependencyManager} from '../'
import {Command} from './base.command'

/**
 * Npm command
 *
 * @public
 */
export class Npm extends Command implements IDependencyManager {
  /**
   * @public
   */
  @bind
  public install(
    dependencies: Array<string | [string, string]>,
    dev: boolean = false,
    onMessage?: (message: string) => void,
  ): Promise<any> {
    return Npm.execute(
      onMessage ?? this.onMessage,
      'npm',
      'install',
      ...Npm.normalizeDependencies(dependencies),
      dev ? '--dev' : null,
      '--cwd',
      this.path,
    )
  }

  /**
   * @public
   */
  @bind
  public uninstall(
    dependencies: Array<string | [string, string]>,
    onMessage?: (message: string) => void,
  ): Promise<any> {
    return Npm.execute(
      onMessage ?? this.onMessage,
      'npm',
      'uninstall',
      ...Npm.normalizeDependencies(dependencies),
      '--prefix',
      this.path,
    )
  }
}
