import type {Bud} from '@roots/bud-framework'
import type {Configuration} from '@roots/bud-framework/config'
import type * as Services from '@roots/bud-framework/services'

import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import isString from '@roots/bud-support/lodash/isString'
import {hash} from '@roots/bud-support/utilities/args'
import {createHash} from 'node:crypto'
import {join} from 'node:path'

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
   * {@link Extension.boot}
   */
  @bind
  public override async boot(bud: Bud) {
    await bud.extensions.add(InvalidateCacheExtension)
    this.logger.success(`cache initialized`)
  }
  /**
   * Cache dependencies
   */
  public get buildDependencies(): Record<string, Array<string>> {
    return this.app.hooks.filter(`build.cache.buildDependencies`, {
      bud: [
        this.app.context.files?.[`package.json`]?.path,
        ...Object.values(this.app.context.files)
          .filter(({bud}) => bud)
          .map(({path}) => path),
      ].filter(Boolean),
    })
  }

  public set buildDependencies(
    dependencies: Record<string, Array<string>>,
  ) {
    this.app.hooks.on(`build.cache.buildDependencies`, dependencies)
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
    if (this.type === `memory`) return true

    return {
      allowCollectingMemory: true,
      buildDependencies: this.buildDependencies,
      cacheDirectory: this.cacheDirectory,
      idleTimeout: 10000,
      idleTimeoutForInitialStore: 0,
      name: this.name,
      profile: this.app.context.debug === true,
      store: `pack` as `pack`,
      type: this.type,
      version: this.app.hooks.filter(`build.cache.version`, this.version),
    }
  }

  /**
   * Flush cache
   */
  @bind
  public async flush(): Promise<void> {
    await this.app.fs.remove(this.cacheDirectory)
  }
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
  public get type(): 'filesystem' | 'memory' {
    return this.app.hooks.filter(
      `build.cache.type`,
      isString(this.app.context.cache)
        ? this.app.context.cache
        : `filesystem`,
    )
  }

  public set type(type: 'filesystem' | 'memory') {
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
}
