import {bind} from 'helpful-decorators'

import type {IDependencyManager} from '../index.js'

import {Command} from './base.command.js'

/**
 * Npm command
 */
export class Npm extends Command implements IDependencyManager {
  /**
   * Get the latest version of a package from the npm registry
   */
  @bind
  public async getLatestVersion(signifier: string): Promise<string> {
    const result = await this.execute([
      `npm`,
      `view`,
      signifier,
      `version`,
    ])

    if (result?.shift) return result.shift().trim()
    // #todo: this is bad
    return `latest` // fallback
  }

  /**
   */
  @bind
  public install(
    dependencies: Array<[string, string] | string>,
    args: Array<string> = [],
  ): Promise<any> {
    return this.execute([
      `npm`,
      `install`,
      ...this.normalizeDependencies(dependencies),
      `--prefix`,
      this.path,
      ...args,
    ])
  }

  /**
   */
  @bind
  public uninstall(
    dependencies: Array<[string, string] | string>,
    args: Array<string> = [],
  ): Promise<any> {
    return this.execute([
      `npm`,
      `uninstall`,
      ...this.normalizeDependencies(dependencies),
      `--prefix`,
      this.path,
      ...args,
    ])
  }
}
