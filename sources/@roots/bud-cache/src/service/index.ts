import {createHash} from 'node:crypto'
import {join} from 'node:path'

import type {Bud} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework/service'
import type * as Services from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators'
import isString from '@roots/bud-support/lodash/isString'
import {hash} from '@roots/bud-support/utilities/args'
import type {Configuration} from '@roots/bud-support/webpack'

import InvalidateCacheExtension from '../invalidate-cache/index.js'

/**
 * Cache service class
 */
export default class Cache
  extends Service
  implements Services.Cache.Service
{
  /**
   * Enabled
   */
  public enabled: boolean = true

  /**
   * Type
   */
  public get name(): string {
    return this.app.hooks.filter(
      `build.cache.name`,
      this.app.hooks.filter(`build.name`, join(`webpack`, this.app.mode)),
    )
  }
  public set name(name: string) {
    this.app.hooks.on(`build.cache.name`, name)
  }

  /**
   * Type
   */
  public get type(): 'memory' | 'filesystem' {
    return this.app.hooks.filter(
      `build.cache.type`,
      this.app.isCLI() && isString(this.app.context.args.cache)
        ? this.app.context.args.cache
        : `filesystem`,
    )
  }

  public set type(type: 'memory' | 'filesystem') {
    this.app.hooks.on(`build.cache.type`, type)
  }

  /**
   * version
   */
  public get version(): string {
    const version = createHash(`sha1`)
    version.update(hash)

    Object.values(this.app.context.files ?? {})
      .filter(file => file?.bud || file?.name?.includes(`package.json`))
      .map(({sha1}) => version.update(sha1))

    return this.app.hooks.filter(
      `build.cache.version`,
      version.digest(`base64`),
    )
  }

  public set version(version: string) {
    this.app.hooks.on(`build.cache.version`, version)
  }

  /**
   * Cache directory
   */
  public get cacheDirectory(): string {
    return this.app.hooks.filter(
      `build.cache.cacheDirectory`,
      this.app.path(`@storage`, this.app.label, `cache`),
    )
  }
  public set cacheDirectory(directory: string) {
    this.app.hooks.on(`build.cache.cacheDirectory`, directory)
  }

  /**
   * Webpack configuration
   */
  public get configuration(): Configuration[`cache`] {
    if (this.enabled !== true) return false
    return this.type === `memory`
      ? true
      : {
          name: this.name,
          type: this.type,
          store: `pack` as `pack`,
          allowCollectingMemory: true,
          cacheDirectory: this.cacheDirectory,
          idleTimeout: 10000,
          idleTimeoutForInitialStore: 0,
          profile: false,
          version: this.app.hooks.filter(
            `build.cache.version`,
            this.version,
          ),
        }
  }

  /**
   * {@link Extension.booted}
   */
  @bind
  public override async booted?(bud: Bud) {
    await bud.extensions.add(InvalidateCacheExtension)
    this.app.success(`cache initialized`)
  }

  /**
   * Flush cache
   */
  @bind
  public async flush(): Promise<void> {
    await this.app.fs.remove(this.cacheDirectory)
  }
}
