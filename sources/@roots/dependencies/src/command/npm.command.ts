import {bind} from 'helpful-decorators'

import type {IDependencyManager} from '../index.js'
import {Command} from './base.command.js'

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
    args: Array<string> = [],
    onMessage?: (message: string) => void,
    onError?: (message: string) => void,
  ): Promise<any> {
    return Npm.execute(
      [
        `npm`,
        `install`,
        ...Npm.normalizeDependencies(dependencies),
        `--prefix`,
        this.path,
      ],
      onMessage,
      onError,
    )
  }

  /**
   * @public
   */
  @bind
  public uninstall(
    dependencies: Array<string | [string, string]>,
    onMessage?: (message: string) => void,
    onError?: (message: string) => void,
  ): Promise<any> {
    return Npm.execute(
      [
        `npm`,
        `uninstall`,
        ...Npm.normalizeDependencies(dependencies),
        `--prefix`,
        this.path,
      ],
      onMessage,
      onError,
    )
  }

  /**
   * Get the latest version of a package from the npm registry
   *
   * @public
   */
  @bind
  public async getLatestVersion(signifier: string): Promise<string> {
    const result = await Npm.execute([`npm`, `view`, signifier, `version`])
    if (result?.shift) return result.shift().trim()
  }
}
