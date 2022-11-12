import {randomUUID} from 'node:crypto'

import type {Bud, Modules} from '@roots/bud-framework'
import {
  ApplyPlugin,
  Extension,
  ExtensionLiteral,
} from '@roots/bud-framework/extension'
import {Service} from '@roots/bud-framework/service'
import type {Extensions as Contract} from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators'
import {isUndefined} from '@roots/bud-support/lodash-es'

/**
 * Extensions Service
 *
 * @public
 */
export default class Extensions
  extends Service
  implements Contract.Service
{
  /**
   * Service label
   *
   * @public
   */
  public static override label = `extensions`

  /**
   * Registered extensions
   *
   * @public
   */
  // @ts-ignore
  public repository: Modules = {}

  /**
   * Resolved options
   *
   * @public
   */
  public resolvedOptions: Contract.Service['resolvedOptions'] = {
    allowlist: [],
    denylist: [],
    discovery: true,
  }

  /**
-   * Modules on which an import attempt was made and failed
-   *
-   * @remarks
-   * This doesn't mean an error, per se. This should only
-   * be used in the context of trying to import `optionalDependencies`
-   * of a given extension module.
-   *
-   * @public
-   */
  public unresolvable: Set<`${keyof Modules & string}`> = new Set()

  /**
   * `register` callback
   *
   * @remarks
   * All this is doing is helping transition people to using `bud.extensions` key for
   * `allowList` and `denyList`. It can be removed in a future release.
   * ⸺ 2022-10-18
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async register(bud: Bud): Promise<void> {
    if (bud.context.manifest?.bud?.allowlist) {
      bud.context.manifest.bud.extensions = {
        ...(bud.context.manifest.bud.extensions ?? {}),
        allowlist: bud.context.manifest.bud.allowlist,
      }
      this.logger.warn(
        `package.json: bud.allowlist is deprecated. Use bud.extensions.allowlist instead.`,
      )
    }

    if (bud.context.manifest?.bud?.denylist) {
      bud.context.manifest.bud.extensions = {
        ...(bud.context.manifest.bud.extensions ?? {}),
        denylist: bud.context.manifest.bud.denylist,
      }
      this.logger.warn(
        `package.json: bud.denylist is deprecated. Use bud.extensions.denylist instead.`,
      )
    }
  }

  /**
   * `booted` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async booted(bud: Bud): Promise<void> {
    if (!isUndefined(bud.context.manifest?.bud?.extensions?.discovery)) {
      this.resolvedOptions.discovery =
        bud.context.manifest.bud.extensions.discovery
    }

    if (!isUndefined(bud.context.args.discovery)) {
      this.resolvedOptions.discovery = bud.context.args.discovery
    }

    if (
      !isUndefined(
        bud.context.manifest?.[this.app.label]?.extensions?.discovery,
      )
    ) {
      this.resolvedOptions.discovery =
        bud.context.manifest?.bud?.[this.app.label].extensions.discovery
    }

    if (!isUndefined(bud.context.args.discovery)) {
      this.resolvedOptions.discovery = bud.context.args.discovery
    }

    this.resolvedOptions.allowlist.push(
      ...(bud.context.manifest?.bud?.extensions?.allowlist ?? []),
      ...(bud.context.manifest?.bud?.[this.app.label]?.extensions
        ?.allowlist ?? []),
    )
    this.resolvedOptions.denylist.push(
      ...(bud.context.manifest?.bud?.extensions?.denylist ?? []),
      ...(bud.context.manifest?.bud?.[this.app.label]?.extensions
        ?.denylist ?? []),
    )

    if (bud.context.extensions.builtIn)
      await Promise.all(
        bud.context.extensions.builtIn
          ?.filter(Boolean)
          .map(async signifier => await this.import(signifier, true)),
      )

    if (
      this.resolvedOptions.discovery &&
      this.resolvedOptions.allowlist.length === 0 &&
      bud.context.extensions?.discovered
    )
      await Promise.all(
        bud.context.extensions.discovered
          .filter(Boolean)
          .filter(this.isAllowed)
          .map(async signifier => await this.import(signifier, true)),
      )
    else if (this.resolvedOptions.allowlist.length > 0)
      await Promise.all(
        this.resolvedOptions.allowlist
          ?.filter(Boolean)
          .filter(this.isAllowed)
          .map(
            async (signifier: `${keyof Modules & string}`) =>
              await this.import(signifier, true),
          ),
      )

    await this.runAll(`init`)
    await this.runAll(`register`)
    await this.runAll(`boot`)
  }

  /**
   * `configAfter` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async configAfter(): Promise<void> {
    await this.runAll(`configAfter`)
  }

  /**
   * `buildBefore` callback
   */
  @bind
  public override async buildBefore(): Promise<void> {
    await this.runAll(`buildBefore`)
  }

  /**
   * `buildBefore` callback
   */
  @bind
  public override async buildAfter(): Promise<void> {
    await this.runAll(`buildAfter`)
  }

  /**
   * Has extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public has<K extends `${keyof Modules & string}`>(key: K): boolean {
    return this.repository[key] ? true : false
  }

  /**
   * Get extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public get<K extends `${keyof Modules & string}`>(key: K): Modules[K] {
    return this.repository[key]
  }

  /**
   * Remove extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public remove<K extends `${keyof Modules & string}`>(key: K): this {
    delete this.repository[key]
    return this
  }

  /**
   * Set extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public set(key: string, value: Extension<any, any>): this {
    this.repository[key] = value

    return this
  }

  /**
   * Instantiate a Framework extension class or object
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public instantiate<K extends `${keyof Modules & string}`>(
    extension: (new (...args: any[]) => Modules[K]) | ExtensionLiteral,
    signifier?: K,
  ): Extension<any, any> {
    const instance =
      typeof extension === `function`
        ? new extension(this.app)
        : // @ts-ignore
        !(extension instanceof Extension)
        ? new Extension(this.app).fromObject(extension)
        : extension

    if (!instance?.label)
      instance.label = signifier ?? (`${randomUUID()}` as keyof Modules)

    return instance
  }

  @bind
  public isAllowed(signifier: string): boolean {
    return (
      (this.resolvedOptions.denylist.length === 0 ||
        !this.resolvedOptions.denylist.includes(signifier)) &&
      (this.resolvedOptions.allowlist.length === 0 ||
        this.resolvedOptions.allowlist.includes(signifier))
    )
  }

  /**
   * Import an extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async import<K extends `${keyof Modules}`>(
    signifier: K,
    fatalOnError = true,
  ): Promise<Extension<any, any>> {
    if (fatalOnError && this.unresolvable.has(signifier))
      throw new Error(`Extension ${signifier} is not importable`)

    if (this.has(signifier)) {
      this.logger.info(signifier, `extension already imported`)
      return
    }

    this.logger.info(`importing`, signifier)

    const extensionClass: ExtensionLiteral = fatalOnError
      ? await this.app.module.import(signifier)
      : await this.app.module.tryImport(signifier)

    if (!extensionClass) return

    const instance = this.instantiate<K>(extensionClass, signifier)

    if (instance.dependsOn)
      await Promise.all(
        Array.from(instance.dependsOn)
          .filter((dependency: K) => !this.has(dependency))
          .map(async (dependency: K) => await this.import(dependency)),
      )

    if (instance.dependsOnOptional)
      await Promise.all(
        Array.from(instance.dependsOnOptional)
          .filter(this.isAllowed)
          .filter(
            (optionalDependency: K) =>
              !this.unresolvable.has(optionalDependency),
          )
          .filter((optionalDependency: K) => !this.has(optionalDependency))
          .map(async (optionalDependency: K) => {
            await this.import(optionalDependency, false)
            if (!this.has(optionalDependency))
              this.unresolvable.add(optionalDependency)
          }),
      )

    this.set(signifier, instance)

    this.logger.success(instance.label, `imported and instantiated`)

    return instance
  }

  /**
   * Add a {@link Extension} to the extensions repository
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async add<K extends `${keyof Modules & string}`>(
    input:
      | Extension<any, any>
      | ExtensionLiteral
      | Array<Extension<any, any> | ExtensionLiteral>
      | K
      | Array<K>,
  ): Promise<void> {
    const arrayed = Array.isArray(input) ? input : [input]

    await arrayed.reduce(async (promised, item) => {
      await promised

      let moduleObject =
        typeof item === `string`
          ? await import(item).then(pkg => pkg.default ?? pkg)
          : item

      const extension = this.instantiate(
        moduleObject,
        typeof item === `string` ? item : undefined,
      )

      this.set(extension.label ?? randomUUID(), extension)

      await this.run(extension, `init`)
      await this.run(extension, `register`)
      await this.run(extension, `boot`)
    }, Promise.resolve())
  }

  /**
   * Run an extension lifecycle method
   *
   * @remarks
   * - `_init`
   * - `_register`
   * - `_boot`
   * - `_buildBefore`
   * - `_make`
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run<K extends `${keyof Modules & string}`>(
    extension: Modules[K],
    methodName: Contract.LifecycleMethods,
  ): Promise<this> {
    if (extension.meta[methodName] === true) return this

    extension.meta[methodName] = true

    try {
      await this.runDependencies(extension, methodName)
      const method = extension[`_${methodName}`]
      await method()
      await this.app.api.processQueue()

      return this
    } catch (error) {
      throw error
    }
  }

  /**
   * Execute a extension lifecycle method on all registered extensions
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async runAll(
    methodName: Contract.LifecycleMethods,
  ): Promise<any> {
    return await Object.values(this.repository).reduce(
      async (promised, extension) => {
        await promised
        await this.run(extension, methodName)
      },
      Promise.resolve(),
    )
  }

  /**
   * Run a lifecycle method for an extension's dependencies
   *
   * @remarks
   * Called from {@link Extension.run}. Ensures a method is run for an
   * extension's dependencies before it is run for the extension itself.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async runDependencies<K extends `${keyof Modules & string}`>(
    extension: Modules[K] | K,
    methodName: Contract.LifecycleMethods,
  ): Promise<void> {
    extension =
      typeof extension === `string` ? this.get(extension) : extension

    if (extension.dependsOn) {
      await Array.from(extension.dependsOn)
        .filter(this.isAllowed)
        .filter((signifier: K) => !this.unresolvable.has(signifier))
        .reduce(async (promised, signifier: K) => {
          await promised
          if (!this.has(signifier)) await this.import(signifier)

          if (!this.get(signifier).meta[methodName])
            await this.run(this.get(signifier), methodName)
        }, Promise.resolve())
    }

    if (extension.dependsOnOptional)
      await Array.from(extension.dependsOnOptional)
        .filter(this.isAllowed)
        .filter((signifier: K) => !this.unresolvable.has(signifier))
        .reduce(async (promised, signifier: K) => {
          await promised
          if (!this.has(signifier)) await this.import(signifier, false)
          if (!this.has(signifier)) {
            this.unresolvable.add(signifier)
            return
          }

          if (
            this.get(signifier) &&
            !isUndefined(this.get(signifier).meta) &&
            !this.get(signifier).meta[methodName]
          )
            await this.run(this.get(signifier), methodName)
        }, Promise.resolve())
  }

  /**
   * Returns an array of plugin instances which have been registered to the
   * container and are set to be used in the compilation
   *
   * @returns An array of plugin instances
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async make(): Promise<ApplyPlugin[]> {
    return await Promise.all(
      Object.values(this.repository).map(
        async extension => await extension._make(),
      ),
    ).then(
      (result: Array<ApplyPlugin>): Array<ApplyPlugin> =>
        result.filter(Boolean),
    )
  }
}
