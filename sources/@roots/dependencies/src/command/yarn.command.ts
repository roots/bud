import {bind} from 'helpful-decorators'

import type {IDependencyManager} from '../index.js'
import {Command} from './base.command.js'

/**
 * Yarn command
 */
export class Yarn extends Command implements IDependencyManager {
  /**
   */
  @bind
  public async install(
    dependencies: Array<string | [string, string]>,
    args: Array<string> = [],
  ): Promise<any> {
    await this.execute([
      `yarn`,
      `add`,
      ...this.normalizeDependencies(dependencies),
      ...args,
    ])
  }

  /**
   */
  @bind
  public async uninstall(
    dependencies: Array<string | [string, string]>,
    args: Array<string> = [],
  ): Promise<any> {
    return await this.execute([
      `yarn`,
      `remove`,
      ...this.normalizeDependencies(dependencies),
      ...args,
    ])
  }

  /**
   * Get the latest version of a package from the registry
   */
  @bind
  public async getLatestVersion(signifier: string): Promise<string> {
    const result = await this.execute([
      `yarn`,
      `info`,
      signifier,
      `version`,
    ])

    if (result?.shift) return result.shift().trim()
  }
}
