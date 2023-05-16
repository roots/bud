import {randomUUID} from 'node:crypto'

import type {Bud, Modules} from '@roots/bud-framework'
import type {ApplyPlugin} from '@roots/bud-framework/extension'
import {Extension} from '@roots/bud-framework/extension'
import {Service} from '@roots/bud-framework/service'
import type {Extensions as Contract} from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators/bind'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import Container from '@roots/container'

import {handleManifestSchemaWarning} from './util/handleManifestSchemaWarning.js'
import {isConstructor} from './util/isConstructor.js'

/**
 * Extensions Service
 */
export default class Extensions
  extends Service
  implements Contract.Service
{
  /**
   * Registered extensions
   */
  // @ts-ignore
  public repository: Modules = {}

  /**
   * Resolved options
   */
  public options: Container<{
    allowlist: Array<string>
    denylist: Array<string>
    discover: boolean
  }>

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
  public unresolvable: Set<string> = new Set()

  public constructor(bud: () => Bud) {
    super(bud)
    this.options = new Container({
      allowlist: [],
      denylist: [],
      discover: true,
    })
  }

  /**
   * `register` callback
   *
   * @todo
   * All this is doing is helping transition people to using `bud.extensions` key for
   * `allowList` and `denyList`. It can be removed in a future release. (2022-10-18)
   */
  @bind
  public override async register(bud: Bud): Promise<void> {
    handleManifestSchemaWarning.bind(this)(bud)
  }

  /**
   * `booted` callback
   */
  @bind
  public override async boot(bud: Bud): Promise<void> {
    const {extensions, manifest} = bud.context

    if (manifest?.bud?.extensions) {
      const {
        discover: _discover,
        discovery: _discovery,
        allowlist,
        denylist,
      } = manifest.bud.extensions

      const discover = _discover ?? _discovery

      if (!isUndefined(discover)) this.options.set(`discover`, discover)
      if (!isUndefined(allowlist))
        this.options.merge(`allowlist`, allowlist)
      if (!isUndefined(denylist)) this.options.merge(`denylist`, denylist)
    }

    if (manifest?.[this.app.label]?.extensions) {
      const {discover, allowlist, denylist} =
        manifest[this.app.label].extensions
      if (!isUndefined(discover)) this.options.set(`discover`, discover)
      if (!isUndefined(allowlist))
        this.options.merge(`allowlist`, allowlist)
      if (!isUndefined(denylist)) this.options.merge(`denylist`, denylist)
    }

    if (
      !isUndefined(extensions.builtIn) &&
      Array.isArray(extensions.builtIn)
    ) {
      this.logger.time(`loading built-in extensions`)
      await Promise.all(
        extensions.builtIn
          .filter(Boolean)
          .map(async extension => await this.import(extension, true)),
      )
      this.logger.timeEnd(`loading built-in extensions`)
    }

    if (
      this.options.isTrue(`discover`) &&
      this.options.isEmpty(`allowlist`) &&
      !isUndefined(extensions.discovered) &&
      Array.isArray(extensions.discovered)
    )
      await Promise.all(
        extensions.discovered.map(
          async (extension: string) => await this.import(extension, true),
        ),
      )
    else if (this.options.isNotEmpty(`allowlist`))
      await Promise.all(
        this.options
          .get(`allowlist`)
          .map(
            async (extension: string) =>
              await this.import(extension, true),
          ),
      )

    await this.runAll(`register`)
    await this.runAll(`boot`)
  }

  /**
   * `configAfter` callback
   */
  @bind
  public override async configAfter?() {
    await this.runAll(`configAfter`)
  }

  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore?() {
    await this.runAll(`buildBefore`)
  }

  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildAfter?() {
    await this.runAll(`buildAfter`)
  }

  /**
   * Has extension
   */
  @bind
  public has(key: string): key is keyof Modules {
    return this.repository[key] ? true : false
  }

  /**
   * Get extension
   */
  @bind
  public get<K extends `${keyof Modules & string}`>(key: K): Modules[K] {
    return this.repository[key]
  }

  /**
   * Remove extension
   */
  @bind
  public remove<K extends `${keyof Modules & string}`>(key: K): this {
    delete this.repository[key]
    return this
  }

  /**
   * Set extension
   */
  @bind
  public set(value: Extension): this {
    const id = value.label ?? randomUUID()
    if (this.has(id)) return
    this.repository[id] = value

    return this
  }

  /**
   * Instantiate a Framework extension class or object
   */
  @bind
  public async instantiate(
    source:
      | (new (...args: any[]) => Extension)
      | Extension
      | {apply: (...args: any[]) => any},
  ): Promise<Extension> {
    if (source instanceof Extension) return source

    if (typeof source === `function`) {
      if (isConstructor(source)) {
        return new source(this.app)
      }

      return source(this.app)
    }

    if (typeof source.apply === `function`) {
      return source as Extension
    }

    if (!isConstructor(source)) {
      return new Extension(this.app).fromObject(source)
    }

    return new source()
  }

  @bind
  public isAllowed(signifier: string): boolean {
    return (
      (this.options.isEmpty(`denylist`) ||
        !this.options.get(`denylist`).includes(signifier)) &&
      (this.options.isEmpty(`allowlist`) ||
        this.options.get(`allowlist`).includes(signifier))
    )
  }

  /**
   * Import an extension
   */
  @bind
  public async import(
    signifier: string,
    required: boolean | number = true,
  ): Promise<Extension> {
    let instance: Extension

    if (!required && !this.isAllowed(signifier)) {
      this.logger.info(signifier, `is not alowed.`, `skipping.`)
      return
    }

    if (this.has(signifier)) {
      this.logger.info(signifier, `already registered. skipping.`)
      return
    }
    if (this.unresolvable.has(signifier)) {
      if (required)
        throw new Error(
          `Already attempted to import ${signifier}  and failed.`,
        )

      this.logger.info(
        `Already attempted to import ${signifier}  and failed.`,
      )

      return
    }

    this.logger.time(`loading ${signifier}`)

    const modulePath = signifier.startsWith(`.`)
      ? this.app.path(signifier)
      : signifier

    try {
      instance = await this.instantiate(
        await this.app.module.import(modulePath, import.meta.url),
      )
      this.set(instance)
    } catch (error) {
      this.unresolvable.add(signifier)
      this.logger.timeEnd(`loading ${signifier}`)
      if (required) throw error
      return
    }

    const {
      dependsOn: dependencies,
      dependsOnOptional: optionalDependencies,
    } = instance

    if (!isUndefined(dependencies) && dependencies.size > 0) {
      await Array.from(dependencies).reduce(
        async (promised, dependency) => {
          await promised
          await this.import(dependency, true)
        },
        Promise.resolve(),
      )
    }

    if (
      this.options.isTrue(`discover`) &&
      !isUndefined(optionalDependencies) &&
      optionalDependencies.size > 0
    ) {
      await Array.from(optionalDependencies).reduce(
        async (promised, dependency) => {
          await promised
          await this.import(dependency, false)
        },
        Promise.resolve(),
      )
    }

    this.logger.timeEnd(`loading ${signifier}`)

    return instance
  }

  /**
   * Add a {@link Extension} to the extensions repository
   */
  @bind
  public async add<K extends `${keyof Modules & string}`>(
    extension:
      | Partial<Extension>
      | (new (bud: Bud) => Partial<Extension>)
      | K
      | Array<
          Partial<Extension> | (new (bud: Bud) => Partial<Extension>) | K
        >,
  ): Promise<void> {
    const arrayed = Array.isArray(extension) ? extension : [extension]

    await arrayed.reduce(async (promised, item) => {
      await promised

      const moduleObject =
        typeof item === `string`
          ? await import(item).then(pkg => pkg.default ?? pkg)
          : item

      const extension = await this.instantiate(moduleObject)

      this.set(extension)

      await this.run(extension, `register`)
      await this.run(extension, `boot`)
    }, Promise.resolve())
  }

  /**
   * Run an extension lifecycle method
   *
   * @remarks
   * - `_register`
   * - `_boot`
   * - `_buildBefore`
   * - `_make`
   */
  @bind
  public async run(
    extension: Extension,
    methodName: Contract.LifecycleMethods,
  ): Promise<this> {
    if (
      isUndefined(extension?.meta?.[methodName]) ||
      extension.meta?.[methodName] === true
    )
      return this

    extension.meta[methodName] = true

    try {
      await this.runDependencies(extension, methodName)
      const method = extension[`_${methodName}`]
      if (method) await method()
      await this.app.api.processQueue()

      return this
    } catch (error) {
      throw error
    }
  }

  /**
   * Execute a extension lifecycle method on all registered extensions
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
   */
  @bind
  public async runDependencies<K extends `${keyof Modules & string}`>(
    extension: Extension | K,
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

          if (
            this.get(signifier) &&
            !this.get(signifier).meta?.[methodName]
          )
            await this.run(this.get(signifier), methodName)
        }, Promise.resolve())
    }

    if (this.options.is(`discover`, true) && extension.dependsOnOptional)
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
            !this.get(signifier).meta?.[methodName]
          )
            await this.run(this.get(signifier), methodName)
        }, Promise.resolve())
  }

  /**
   * Returns an array of plugin instances which have been registered to the
   * container and are set to be used in the compilation
   *
   * @returns An array of plugin instances
   */
  @bind
  public async make(): Promise<ApplyPlugin[]> {
    return await Promise.all(
      Object.values(this.repository).map(async extension =>
        `apply` in extension ? extension : await extension._make(),
      ),
    ).then(
      (result: Array<ApplyPlugin>): Array<ApplyPlugin> =>
        result.filter(Boolean),
    )
  }
}
