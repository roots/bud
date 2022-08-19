import {
  Extension,
  Extensions as Contract,
  Modules,
  Service,
} from '@roots/bud-framework'
import type {
  ApplyPlugin,
  ExtensionLiteral,
} from '@roots/bud-framework/src/extension'
import {bind} from 'helpful-decorators'

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
  public static label = `extensions`

  /**
   * Service store
   *
   * @public
   */
  public repository: Modules = {}

  /**
-   * Modules on which an import
-   * attempt was made and failed
-   *
-   * @remarks
-   * This doesn't mean an error, per se. This should only
-   * be used in the text of trying to import `optionalDependencies`
-   * of a given extension module.
-   *
-   * @public
-   */
  public unresolvable = new Set()

  /**
   * `booted` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async booted(): Promise<void> {
    await Promise.all(
      this.app.context.extensions.filter(Boolean).map(this.import),
    )

    await this.runAll(`_init`)
    await this.runAll(`_register`)
    await this.runAll(`_boot`)
  }

  /**
   * `afterConfig` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async afterConfig(): Promise<void> {
    await this.runAll(`_afterConfig`)
  }

  /**
   * `beforeBuild` callback
   */
  @bind
  public async beforeBuild(): Promise<void> {
    await this.runAll(`_beforeBuild`)
  }

  /**
   * Has extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public has<K extends keyof Modules>(
    key: K & string,
    ...iterable: any[]
  ): boolean {
    return this.repository[key] ? true : false
  }

  /**
   * Get extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public get<K extends keyof Modules>(key: K & string) {
    return this.repository[key]
  }

  /**
   * Remove extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public remove<K extends keyof Modules>(key: K & string): this {
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
  public set<K extends Modules>(value: Modules[K & string]): this {
    this.repository[value.label] = value
    return this
  }

  /**
   * Instantiate a Framework extension class or object
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public instantiate<K extends Modules>(
    extension:
      | (new (...args: any[]) => Modules[K & string])
      | ExtensionLiteral,
  ): Modules[K & string] {
    return typeof extension === `function`
      ? new extension(this.app)
      : !(extension instanceof Extension)
      ? new Extension(this.app).fromObject(extension)
      : extension
  }

  @bind
  public filterApplicableExtensions(extensions: Array<string>) {
    return extensions
      .filter(
        signifier =>
          !this.app.context.manifest.bud?.denylist ||
          !this.app.context.manifest.bud?.denylist.includes(signifier),
      )
      .filter(
        signifier =>
          !this.app.context.manifest.bud?.allowlist ||
          this.app.context.manifest.bud?.allowlist.includes(signifier),
      )
  }

  /**
   * Import an extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async import(signifier: string): Promise<Extension> {
    if (
      this.has(signifier) ||
      this.unresolvable.has(signifier) ||
      !this.filterApplicableExtensions([signifier]).length
    )
      return

    this.app.log(`importing`, signifier)

    const extension = await this.app.module.import(signifier)
    const instance = this.instantiate(extension)

    if (instance.dependsOn) {
      await this.filterApplicableExtensions(
        Array.from(instance.dependsOn),
      ).reduce(async (promised: Promise<any>, signifier): Promise<any> => {
        await promised
        if (this.has(signifier) || this.unresolvable.has(signifier)) return

        await this.import(signifier)

        if (!this.has(signifier)) {
          this.unresolvable.add(signifier)
          this.app.error(`missing dependency`, signifier)
        }
      }, Promise.resolve())
    }

    if (instance.dependsOnOptional) {
      await this.filterApplicableExtensions(
        Array.from(instance.dependsOnOptional),
      ).reduce(async (promised: Promise<any>, signifier): Promise<any> => {
        try {
          await promised

          if (this.has(signifier) || this.unresolvable.has(signifier))
            return

          await this.import(signifier)
          if (!this.has(signifier)) this.unresolvable.add(signifier)
        } catch (err) {}
      }, Promise.resolve())
    }

    if (instance.optIn) {
      await this.filterApplicableExtensions(
        Array.from(instance.optIn),
      ).reduce(async (promised: Promise<any>, signifier): Promise<any> => {
        try {
          await promised

          if (
            this.has(signifier) ||
            this.unresolvable.has(signifier) ||
            ![
              ...(this.app.context.manifest.devDependencies
                ? Object.keys(this.app.context.manifest.devDependencies)
                : []),
              ...(this.app.context.manifest.dependencies
                ? Object.keys(this.app.context.manifest.dependencies)
                : []),
            ].includes(signifier)
          ) {
            return
          }

          await this.import(signifier)
          if (!this.has(signifier)) this.unresolvable.add(signifier)
        } catch (err) {}
      }, Promise.resolve())
    }

    this.set(instance)

    return extension
  }

  /**
   * Run an extension lifecycle method
   *
   * @remarks
   * - `_init`
   * - `_register`
   * - `_boot`
   * - `_beforeBuild`
   * - `_make`
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run<K extends Modules>(
    extension: Modules[K & string],
    methodName:
      | '_init'
      | '_register'
      | '_boot'
      | '_afterConfig'
      | '_beforeBuild'
      | '_make',
  ): Promise<this> {
    if (extension.meta[methodName] === true) return this
    else extension.meta[methodName] = true

    try {
      await this.runDependencies(extension, methodName)

      if (!extension[methodName.replace(`_`, ``)]) return this

      await extension[methodName]()

      await this.app.api.processQueue()

      return this
    } catch (err) {
      this.app.error(err)
    }
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
  public async runDependencies<K extends Modules>(
    extension: Modules[K & string] | (keyof Modules & string),
    methodName:
      | '_init'
      | '_register'
      | '_boot'
      | '_afterConfig'
      | '_beforeBuild'
      | '_make',
  ): Promise<void> {
    extension =
      typeof extension === `string` ? this.get(extension) : extension

    if (extension.dependsOn && extension.dependsOn.size > 0) {
      await Array.from(extension.dependsOn).reduce(
        async (
          promised: Promise<any>,
          signifier: string,
        ): Promise<any> => {
          await promised

          try {
            if (!this.has(signifier)) await this.import(signifier)

            if (!this.get(signifier).meta[methodName])
              await this.run(this.get(signifier), methodName)
          } catch (error) {
            this.app.error(error)
          }
        },
        Promise.resolve(),
      )
    }

    if (
      extension.dependsOnOptional &&
      extension.dependsOnOptional.size > 0
    ) {
      await Array.from(extension.dependsOnOptional).reduce(
        async (promised, dependency) => {
          await promised

          try {
            if (!this.has(dependency)) await this.import(dependency)
            await this.run(this.get(dependency), methodName)
          } catch (error) {}
        },
        Promise.resolve(),
      )
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
    methodName:
      | '_init'
      | '_register'
      | '_boot'
      | '_afterConfig'
      | '_beforeBuild'
      | '_make',
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
   * Add a {@link Extension} to the extensions repository
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async add(
    input:
      | (new (...args: any[]) => Extension)
      | ExtensionLiteral
      | Array<(new (...args: any[]) => Extension) | ExtensionLiteral>,
  ): Promise<void> {
    const arrayed = Array.isArray(input) ? input : [input]

    await arrayed.reduce(async (promised, extensionObject) => {
      await promised

      try {
        const extension = this.instantiate(extensionObject)
        if (!extension || (extension.label && this.has(extension.label)))
          return

        this.set(extension)

        await this.run(extension, `_init`)
        await this.run(extension, `_register`)
        await this.run(extension, `_boot`)
      } catch (err) {
        this.app.error(err)
        return Promise.reject()
      }
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
