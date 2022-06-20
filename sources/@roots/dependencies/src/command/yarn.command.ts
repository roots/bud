import {bind} from 'helpful-decorators'

import type {IDependencyManager} from '../index.js'
import {Command} from './base.command.js'

/**
 * Yarn command
 *
 * @public
 */
export class Yarn extends Command implements IDependencyManager {
  /**
   * @public
   */
  @bind
  public install(
    dependencies: Array<string | [string, string]>,
    dev: boolean = false,
    onMessage?: (message: string) => void,
  ): Promise<any> {
    return Yarn.execute(
      onMessage ?? this.onMessage,
      'yarn',
      'add',
      ...Yarn.normalizeDependencies(dependencies),
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
    return Yarn.execute(
      onMessage ?? this.onMessage,
      'yarn',
      'remove',
      ...Yarn.normalizeDependencies(dependencies),
      '--cwd',
      this.path,
    )
  }
}
