/* eslint-disable n/no-process-env */
import {realpath} from 'fs/promises'
import {join} from 'path'

import {Npm} from './command/index.js'
import {Yarn} from './command/index.js'
import type {IDependencyManager} from './index.js'

export class Dependencies {
  public constructor(
    public path: string,
    public onMessage?: (...args: any[]) => void,
    public onError?: (...args: any[]) => void,
  ) {}

  public async getClient(): Promise<IDependencyManager> {
    return await this.isYarn().then(isYarn => {
      return isYarn
        ? new Yarn(this.path, this.onMessage, this.onError)
        : new Npm(this.path, this.onMessage, this.onError)
    })
  }

  public async isYarn(): Promise<boolean> {
    try {
      return await realpath(join(this.path, `yarn.lock`)).then(
        result => typeof result === `string`,
      )
    } catch (e) {
      return false
    }
  }

  /**
   * Get the latest version of a package from the npm registry
   *
   * @returns - Package version
   */
  public async getLatestVersion(signifier: string): Promise<string> {
    return await this.getClient().then(
      async client => await client.getLatestVersion(signifier),
    )
  }
}
