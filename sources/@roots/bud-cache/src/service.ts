import type {Bud} from '@roots/bud-framework'
import type {Configuration} from '@roots/bud-framework/config'
import type {Cache as BudCache} from '@roots/bud-framework/services'

import {join} from 'node:path'

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
   * {@link Service.boot}
   */
  public override async boot?(bud: Bud) {
    if (bud.context.force === true) {
      await this.flush()
    }
    this.enabled = bud.context.cache !== false
  }

  /**
   *{@link BudCache.buildDependencies}
   */
  public get buildDependencies(): Record<string, Array<string>> {
    const baseDependencies = {
      bud: [
        this.app.context.files[`package`]?.path,
        ...Object.values(this.app.context.files)
          .filter(({bud}) => bud)
          .map(({path}) => path),
      ].filter(Boolean),
    }

    return (
      this.app.hooks.filter(
        `build.cache.buildDependencies`,
        baseDependencies,
      ) ?? baseDependencies
    )
  }
  public set buildDependencies(
    dependencies: Record<string, Array<string>>,
  ) {
    this.app.hooks.on(`build.cache.buildDependencies`, dependencies)
  }

  /**
   * {@link BudCache.cacheDirectory}
   */
  public get cacheDirectory(): string {
    return (
      this.app.hooks.filter(
        `build.cache.cacheDirectory`,
        this.app.path(`@storage`, this.app.label, `cache`),
      ) ?? this.app.path(`@storage`, this.app.label, `cache`)
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
   * {@link BudCache.flush}
   */
  @bind
  public async flush(): Promise<void> {
    await this.app.fs.remove(this.cacheDirectory)
  }

  /**
   * {@link BudCache.name}
   */
  public get name(): string {
    return (
      this.app.hooks.filter(
        `build.cache.name`,
        this.app.hooks.filter(
          `build.name`,
          join(this.app.mode, ...Object.values(this.app.context._ ?? {})),
        ),
      ) ?? join(this.app.mode, ...Object.values(this.app.context._ ?? {}))
    )
  }
  public set name(name: string) {
    this.app.hooks.on(`build.cache.name`, name)
  }

  /**
   * {@link BudCache.register}
   */
  public override async register?(bud: Bud) {
    this.enabled = bud.context.cache !== false
    this.version = bud.context.bud.version
  }

  /**
   * {@link BudCache.type}
   */
  public get type(): 'filesystem' | 'memory' {
    return (
      this.app.hooks.filter(
        `build.cache.type`,
        isString(this.app.context.cache)
          ? this.app.context.cache
          : `filesystem`,
      ) ?? `filesystem`
    )
  }
  public set type(type: 'filesystem' | 'memory') {
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
}
