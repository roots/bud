import type {Bud} from '@roots/bud-framework'
import type {
  Configuration,
  FileCacheOptions,
} from '@roots/bud-framework/config'
import type {
  Cache as BudCache,
  CacheCallback as Callback,
} from '@roots/bud-framework/services/cache'

import {join} from 'node:path'

import {isBuildDependency} from '@roots/bud-cache/helpers'
import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import isString from '@roots/bud-support/lodash/isString'

/**
 * {@link Bud.cache}
 */
export default class Cache extends Service implements BudCache {
  /**
   * {@link BudCache.enabled}
   */
  public declare enabled: boolean
  /**
   * {@link BudCache.allowCollectingMemory}
   */
  public get allowCollectingMemory(): FileCacheOptions[`allowCollectingMemory`] {
    const fallback = true

    const value = this.app.hooks.filter(
      `build.cache.allowCollectingMemory`,
      fallback,
    )
    return typeof value === `boolean` ? value : fallback
  }
  public set allowCollectingMemory(
    value: Callback<FileCacheOptions[`allowCollectingMemory`]>,
  ) {
    this.app.hooks.on(`build.cache.allowCollectingMemory`, value)
  }

  /**
   *{@link BudCache.buildDependencies}
   */
  public get buildDependencies(): FileCacheOptions[`buildDependencies`] {
    const dependencies = new Set(
      [
        this.app.context.files[`package`]?.path,
        ...Object.values(this.app.context.files)
          .filter(isBuildDependency)
          .map(({path}) => path),
      ].filter(Boolean),
    )
    const records = {
      bud: [...dependencies],
    }

    return (
      this.app.hooks.filter(`build.cache.buildDependencies`, records) ??
      records
    )
  }
  public set buildDependencies(
    dependencies: Callback<FileCacheOptions[`buildDependencies`]>,
  ) {
    this.app.hooks.on(`build.cache.buildDependencies`, dependencies)
  }

  /**
   * {@link BudCache.cacheDirectory}
   */
  public get cacheDirectory(): string {
    const fallback = this.app.path(`@storage`, this.app.label, `cache`)
    return (
      this.app.hooks.filter(`build.cache.cacheDirectory`, fallback) ??
      fallback
    )
  }
  public set cacheDirectory(
    directory: Callback<FileCacheOptions[`cacheDirectory`]>,
  ) {
    this.app.hooks.on(`build.cache.cacheDirectory`, directory)
  }

  /**
   * {@link BudCache.name}
   */
  public get name(): string {
    const fallback = join(
      this.app.mode,
      ...Object.values(this.app.context._ ?? {}),
    )
    return (
      this.app.hooks.filter(
        `build.cache.name`,
        this.app.hooks.filter(`build.name`, fallback),
      ) ?? fallback
    )
  }
  public set name(name: string) {
    this.app.hooks.on(`build.cache.name`, name)
  }

  /**
   * {@link BudCache.type}
   */
  public get type(): 'filesystem' | 'memory' {
    const fallback = isString(this.app.context.cache)
      ? this.app.context.cache
      : `filesystem`

    return this.app.hooks.filter(`build.cache.type`) ?? fallback
  }
  public set type(type: Callback<FileCacheOptions[`type`]>) {
    this.app.hooks.on(`build.cache.type`, type)
  }

  /**
   * {@link BudCache.version}
   */
  public get version(): string | undefined {
    return this.app.hooks.filter(`build.cache.version`, undefined)
  }
  public set version(version: string) {
    this.app.hooks.on(`build.cache.version`, version)
  }

  /**
   * {@link Service.boot}
   */
  public override async boot?(bud: Bud) {
    if (bud.context.force === true) {
      await this.flush()
    }
    this.enabled = bud.context.cache !== false
  }

  /**
   * {@link BudCache.configuration}
   * @readonly
   */
  public get configuration(): Configuration[`cache`] {
    if (this.enabled !== true) return false
    if (this.type === `memory`) return true

    return {
      allowCollectingMemory: this.allowCollectingMemory,
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
   * {@link BudCache.flush}
   */
  @bind
  public async flush(): Promise<void> {
    await this.app.fs.remove(this.cacheDirectory)
  }

  /**
   * Get {@link BudCache.allowCollectingMemory}
   */
  public getAllowCollectingMemory() {
    return this.allowCollectingMemory
  }
  /**
   * Get {@link BudCache.buildDependencies}
   */
  public getBuildDependencies() {
    return this.buildDependencies
  }

  /**
   * Get {@link BudCache.cacheDirectory}
   */
  public getCacheDirectory() {
    return this.cacheDirectory
  }
  /**
   * Get {@link BudCache.type}
   */
  public getType() {
    return this.type
  }

  /**
   * {@link BudCache.register}
   */
  public override async register?(bud: Bud) {
    this.enabled = bud.context.cache !== false
    this.version = bud.context.bud.version
  }
  /**
   * Set {@link BudCache.allowCollectingMemory}
   */
  public setAllowCollectingMemory(
    value: Callback<FileCacheOptions[`allowCollectingMemory`]>,
  ): this {
    this.allowCollectingMemory = value
    return this
  }

  /**
   * Set {@link BudCache.buildDependencies}
   */
  public setBuildDependencies(
    dependencies:
      | ((
          records?: Record<string, Array<string>>,
        ) => Record<string, Array<string>>)
      | Record<string, Array<string>>,
  ) {
    this.buildDependencies = dependencies
    return this
  }

  /**
   * Set {@link BudCache.cacheDirectory}
   */
  public setCacheDirectory(
    directory: Callback<FileCacheOptions[`cacheDirectory`]>,
  ) {
    this.cacheDirectory = directory
    return this
  }

  /**
   * Set {@link BudCache.type}
   */
  public setType(type: Callback<FileCacheOptions[`type`]>) {
    this.type = type
    return this
  }
}
