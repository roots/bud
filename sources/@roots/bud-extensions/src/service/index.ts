import type {Bud, Modules} from '@roots/bud-framework'
import type {ApplyPlugin} from '@roots/bud-framework/extension'
import type {
  Extensions as BudExtensions,
  LifecycleMethods,
} from '@roots/bud-framework/services/extensions'

import {randomUUID} from 'node:crypto'

import {handleManifestSchemaWarning} from '@roots/bud-extensions/helpers/handleManifestSchemaWarning'
import {isConstructor} from '@roots/bud-extensions/helpers/isConstructor'
import {Extension} from '@roots/bud-framework/extension'
import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {ExtensionError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/isFunction'
import isUndefined from '@roots/bud-support/isUndefined'
import Container from '@roots/container'

/**
 * Extensions Service
 */
class Extensions extends Service implements BudExtensions {
  /**
   * Resolved options
   */
  public options: Container<{
    allowlist: Array<string>
    denylist: Array<string>
    discover: boolean
  }>

  /**
   * Registered extensions
   */
  public repository: Modules

  /**
   * Modules on which an import attempt was made and failed
   *
   * @remarks
   * This doesn't mean an error, per se. This should only
   * be used in the context of trying to import `optionalDependencies`
   * of a given extension module.
   *
   * @public
   */
  public unresolvable: Set<string>

  /**
   *
   * @param bud Class constructor
   */
  public constructor(bud: () => Bud) {
    super(bud)
    this.options = new Container({
      allowlist: [],
      denylist: [],
      discover: true,
    })
    this.repository = {} as Modules
    this.unresolvable = new Set()
  }

  /**
   * Add a {@link Extension} to the extensions repository
   */
  @bind
  public async add<K extends `${keyof Modules & string}`>(
    extension:
      | Array<
          K | (new (bud: Bud) => Partial<Extension>) | Partial<Extension>
        >
      | K
      | (new (bud: Bud) => Partial<Extension>)
      | Partial<Extension>,
  ): Promise<void> {
    const arrayed = Array.isArray(extension) ? extension : [extension]

    await arrayed.reduce(async (promised, item) => {
      await promised

      const source =
        typeof item === `string`
          ? await this.app.module
              .import(
                item.startsWith(`./`) ? this.app.path(item) : item,
                import.meta.url,
              )
              .then(pkg => pkg.default ?? pkg)
          : item

      const extension = await this.instantiate(source)

      this.set(extension)
      this.logger.log(`added`, extension.label)

      await this.run(extension, `register`)
      await this.run(extension, `boot`)
    }, Promise.resolve())
  }

  /**
   * {@link BudExtensions.bootstrap}
   */
  @bind
  public async configBefore?(bud: Bud) {
    handleManifestSchemaWarning.bind(this)(bud)

    const {extensions, manifest} = bud.context

    if (manifest?.bud?.extensions) {
      const {allowlist, denylist} = manifest.bud.extensions
      const discover =
        manifest.bud.extensions.discover ??
        manifest.bud.extensions.discovery

      if (!isUndefined(discover)) this.options.set(`discover`, discover)
      if (!isUndefined(allowlist))
        this.options.merge(`allowlist`, allowlist)
      if (!isUndefined(denylist)) this.options.merge(`denylist`, denylist)
    }

    if (manifest?.bud?.[this.app.label]?.extensions) {
      const {allowlist, denylist} = manifest.bud[this.app.label].extensions

      const discover =
        manifest.bud[this.app.label].extensions.discover ??
        manifest.bud[this.app.label].extensions.discovery

      if (!isUndefined(discover)) this.options.set(`discover`, discover)
      if (!isUndefined(allowlist))
        this.options.set(`allowlist`, (allowed = []) => [
          ...allowed,
          ...allowlist,
        ])
      if (!isUndefined(denylist))
        this.options.set(`denylist`, (denied = []) => [
          ...denied,
          ...allowlist,
        ])
    }

    if (
      !isUndefined(extensions?.builtIn) &&
      Array.isArray(extensions.builtIn)
    )
      await Promise.all(
        extensions.builtIn
          .filter(Boolean)
          .map(async signifier => await this.import(signifier, true)),
      )

    if (!isUndefined(bud.context.discover)) {
      this.options.set(`discover`, bud.context.discover)
    }

    if (
      this.options.is(`discover`, true) &&
      this.options.isEmpty(`allowlist`) &&
      !isUndefined(extensions?.discovered) &&
      Array.isArray(extensions.discovered)
    )
      await Promise.all(
        extensions.discovered
          .filter(Boolean)
          .filter(this.isAllowed)
          .map(async signifier => await this.import(signifier, true)),
      )
    else if (this.options.isNotEmpty(`allowlist`))
      await Promise.all(
        this.options
          .get(`allowlist`)
          .filter(Boolean)
          .filter(this.isAllowed)
          .map(
            async (signifier: string) =>
              await this.import(signifier, true),
          ),
      )

    await this.runAll(`register`)
    await this.runAll(`boot`)
  }

  /**
   * {@link BudExtensions.buildBefore}
   */
  @bind
  public override async buildAfter?(bud: Bud) {
    await this.runAll(`buildAfter`)
  }

  /**
   * {@link BudExtensions.buildBefore}
   */
  @bind
  public override async buildBefore?(bud: Bud) {
    await this.runAll(`buildBefore`)
  }

  /**
   * {@link BudExtensions.compilerDone}
   */
  @bind
  public override async compilerDone?(bud, stats) {
    await this.runAll(`compilerDone`)
  }

  /**
   * {@link BudExtensions.configAfter}
   */
  @bind
  public override async configAfter?(bud: Bud) {
    await this.runAll(`configAfter`)
  }

  /**
   * Get extension
   */
  @bind
  public get<K extends `${keyof Modules & string}`>(key: K): Modules[K] {
    return this.repository[key]
  }

  /**
   * Has extension
   */
  @bind
  public has(key: string): key is `${keyof Modules & string}` {
    return this.repository[key] ? true : false
  }

  /**
   * Import an extension
   */
  @bind
  public async import(
    signifier: string,
    required: boolean | number = true,
  ): Promise<Extension> {
    if (required && this.unresolvable.has(signifier))
      throw new Error(`Extension ${signifier} is not importable`)

    if (signifier.startsWith(`.`)) {
      signifier = this.app.path(signifier)
      this.logger.info(`local path interpretation:`, signifier)
    }

    if (this.has(signifier)) {
      this.logger.info(signifier, `already imported`)
      return this.get(signifier) as Extension
    }

    const extension: Extension = await this.app.module
      .import(signifier, import.meta.url)
      .catch(error => {
        this.unresolvable.add(signifier)
        if (required) throw error
      })

    if (!extension) {
      if (required)
        throw new ExtensionError(
          `Extension ${signifier} not found but required`,
        )

      return
    }

    const instance = await this.instantiate(extension)

    if (instance.dependsOn)
      await Promise.all(
        Array.from(instance.dependsOn)
          .filter(dependency => !this.has(dependency))
          .map(async dependency => await this.import(dependency, true)),
      )

    if (this.options.is(`discover`, true) && instance.dependsOnOptional)
      await Promise.all(
        Array.from(instance.dependsOnOptional)
          .filter(this.isAllowed)
          .filter(
            optionalDependency =>
              !this.unresolvable.has(optionalDependency),
          )
          .filter(optionalDependency => !this.has(optionalDependency))
          .map(async optionalDependency => {
            await this.import(optionalDependency, false)
            if (!this.has(optionalDependency))
              this.unresolvable.add(optionalDependency)
          }),
      )

    this.set(instance)

    return instance
  }

  /**
   * {@link BudExtensions.instantiate}
   */
  @bind
  public async instantiate(
    source:
      | {apply: (...args: any[]) => any}
      | Extension
      | (new (...args: any[]) => Extension),
  ): Promise<Extension> {
    if (source instanceof Extension) return source

    if (isConstructor(source)) {
      const instance = new source(this.app)
      if (!instance.label)
        instance.label =
          instance.constructor.name ??
          (randomUUID() as keyof Modules & string)
      return instance
    }

    if (typeof source === `function`) {
      const instance = source(this.app)
      if (!instance.label)
        instance.label =
          instance.constructor.name ??
          (randomUUID() as keyof Modules & string)
      return instance
    }

    if (typeof source.apply === `function`) {
      return source as Extension
    }

    if (!isConstructor(source)) {
      const instance = new Extension(this.app)
      Object.entries(source).forEach(([k, v]) => {
        if (k === `options`) {
          instance.setOptions(v)
          return
        }
        instance[k] = v
      })
      if (!instance.label)
        instance.label = randomUUID() as keyof Modules & string
      return instance
    }

    return new source(this.app)
  }
  /**
   * {@link BudExtensions.isAllowed}
   */
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
   * Returns an array of plugin instances which have been registered to the
   * container and are set to be used in the compilation
   *
   * @returns An array of plugin instances
   */
  @bind
  public async make(): Promise<ApplyPlugin[]> {
    const results = await Promise.all(
      Object.entries(this.repository ?? {}).map(
        async ([label, extension]) => {
          if (!extension) return null

          if (extension instanceof Extension)
            return [label, await extension.execute(`make`)]

          if (`make` in extension)
            return [
              label,
              await extension.make(this.app, extension.options),
            ]

          if (`apply` in extension) {
            return [label, extension]
          }
        },
      ),
    ).then(
      (results: Array<[string, ApplyPlugin]>): Array<ApplyPlugin> =>
        results
          .filter(Boolean)
          .filter(([_label, result]) => result)
          .map(([label, result]) => {
            this.logger.log(`defined compiler plugin:`, label).info(result)
            return result
          }),
    )

    this.logger.log(`using`, results.length, `compiler plugins`)

    return results
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
   * Run an extension lifecycle method
   *
   * @remarks
   * - `register`
   * - `boot`
   * - `buildBefore`
   * - `make`
   */
  @bind
  public async run(
    extension: ApplyPlugin | Partial<Extension>,
    methodName: LifecycleMethods,
  ): Promise<this> {
    try {
      await this.runDependencies(extension, methodName)
      if (`execute` in extension && isFunction(extension.execute))
        await extension.execute(methodName)

      return this
    } catch (error) {
      throw error
    }
  }

  /**
   * Execute a extension lifecycle method on all registered extensions
   */
  @bind
  public async runAll(methodName: LifecycleMethods): Promise<any> {
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
    extension: K | Modules[K],
    methodName: LifecycleMethods,
  ): Promise<void> {
    let instance: Modules[K] & Partial<Extension>

    if (typeof extension === `string` && this.has(extension)) {
      instance = this.get(extension)
    } else {
      instance = extension
    }

    if (`dependsOn` in instance) {
      await Array.from(instance.dependsOn)
        .filter(this.isAllowed)
        .filter((signifier: string) => !this.unresolvable.has(signifier))
        .reduce(async (promised, signifier: any) => {
          await promised
          if (!this.has(signifier)) await this.import(signifier, true)

          await this.run(this.get(signifier), methodName)
        }, Promise.resolve())
    }

    if (!this.options.isTrue(`discover`)) return
    if (!(`dependsOnOptional` in instance)) return

    await Array.from(instance.dependsOnOptional)
      .filter(this.isAllowed)
      .filter((signifier: string) => !this.unresolvable.has(signifier))
      .reduce(async (promised, signifier: any) => {
        await promised
        if (!this.has(signifier)) await this.import(signifier, false)
        if (!this.has(signifier)) {
          this.unresolvable.add(signifier)
          return
        }

        await this.run(this.get(signifier), methodName)
      }, Promise.resolve())
  }

  /**
   * Set extension
   */
  @bind
  public set(value: Extension): this {
    const key = (value.label ?? randomUUID()) as any
    Object.assign(this.repository, {[key]: value})
    this.logger.info(`set`, key, `=>`, value)

    return this
  }
}

export {Extensions as default}
