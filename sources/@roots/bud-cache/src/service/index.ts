import type {Bud} from '@roots/bud-framework'
import type {Configuration} from '@roots/bud-framework/config'
import type {Cache as BudCache} from '@roots/bud-framework/services'

import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import isString from '@roots/bud-support/lodash/isString'
import {join} from 'node:path'

/**
 * Cache service class
 */
export default class Cache extends Service implements BudCache {
  /**
   * Enabled
   */
  public enabled: boolean

  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot(bud: Bud) {
    if (bud.context.force === true) {
      await this.flush()
    }
    this.enabled = bud.context.cache !== false
  }

  /**
   *{@link BudCache.buildDependencies}
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
   * {@link BudCache.configuration}
   * @readonly
   */
  public get configuration(): Configuration[`cache`] {
    if (this.enabled !== true) return false
    if (this.type === `memory`) return true

    return {
      allowCollectingMemory: true,
      buildDependencies: this.buildDependencies,
      cacheDirectory: this.cacheDirectory,
      compression: this.app.isDevelopment ? false : `brotli`,
      hashAlgorithm: `xxhash64`,
      idleTimeout: 100,
      idleTimeoutForInitialStore: 0,
      managedPaths: [this.cacheDirectory, this.app.path(`@modules`)],
      name: this.name,
      profile: this.app.context.debug === true,
      store: `pack`,
      type: this.type,
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
   * {@link BudCache.name}
   */
  public get name(): string {
    return this.app.hooks.filter(
      `build.cache.name`,
      this.app.hooks.filter(
        `build.name`,
        join(this.app.mode, ...Object.values(this.app.context._ ?? {})),
      ),
    )
  }
  public set name(name: string) {
    this.app.hooks.on(`build.cache.name`, name)
  }

  @bind
  public override async register(bud: Bud) {
    this.enabled = bud.context.cache !== false
    this.version = bud.context.bud.version
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
    return this.app.hooks.filter(`build.cache.version`, undefined)
  }
  public set version(version: string) {
    this.app.hooks.on(`build.cache.version`, version)
  }
}
