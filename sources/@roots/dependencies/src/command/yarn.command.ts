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
  public async install(
    dependencies: Array<[string, string]>,
    args: Array<string> = [],
    onMessage?: (message: string) => void,
    onError?: (message: string) => void,
  ): Promise<any> {
    await Yarn.execute(
      [
        `yarn`,
        `add`,
        ...Yarn.normalizeDependencies(dependencies),
        ...args,
      ],
      onMessage,
      onError,
    )
    await Yarn.execute([`yarn`, `install`])
  }

  /**
   * @public
   */
  @bind
  public async uninstall(
    dependencies: Array<[string, string]>,
    onMessage?: (message: string) => void,
    onError?: (message: string) => void,
  ): Promise<any> {
    return await Yarn.execute(
      [`yarn`, `remove`, ...Yarn.normalizeDependencies(dependencies)],
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
    const result = await Yarn.execute([
      `yarn`,
      `info`,
      signifier,
      `version`,
    ])

    if (result?.shift) return result.shift().trim()
  }
}
