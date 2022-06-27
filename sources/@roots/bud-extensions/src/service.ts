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
import chalk from 'chalk'
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
   * Service store
   *
   * @public
   */
  public repository: Modules = {}

  /**
   * `booted` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async booted(): Promise<void> {
    ;[...this.app.options.extensions].map(this.instantiate).map(this.set)

    await this.injectExtensions()

    await this.runAll('_init')
    await this.runAll('_register')
    await this.runAll('_boot')
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
    value.logger.log(`setting`)
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
    return typeof extension === 'function'
      ? new extension(this.app)
      : !(extension instanceof Extension)
      ? new Extension(this.app).fromObject(extension)
      : extension
  }

  @bind
  protected filterApplicableExtensions(
    extensions: Array<string>,
  ): Array<string> {
    return extensions
      .filter(signifier => !this.has(signifier))
      .filter(
        signifier =>
          signifier.startsWith('@roots/bud-') ||
          signifier.startsWith('@roots/sage') ||
          signifier.startsWith('bud-'),
      )
      .filter(
        signifier =>
          ![
            '@roots/bud-api',
            '@roots/bud-build',
            '@roots/bud-cache',
            '@roots/bud-client',
            '@roots/bud-compiler',
            '@roots/bud-dashboard',
            '@roots/bud-extensions',
            '@roots/bud-framework',
            '@roots/bud-hooks',
            '@roots/bud-server',
          ].includes(signifier),
      )
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
   * Automatically instantiate and register extensions
   * located from the project `package.json` manifest
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async injectExtensions() {
    if (this.app.hooks.filter('feature.inject') === false) {
      return this.app.log('injection disabled')
    }

    this.app.log('injecting extensions...')

    await this.filterApplicableExtensions(
      Object.keys({
        ...(this.app.context.manifest?.devDependencies ?? {}),
        ...(this.app.context.manifest?.dependencies ?? {}),
      }),
    ).reduce(async (promised: Promise<any>, signifier): Promise<any> => {
      await promised

      try {
        this.app.log('...importing', signifier)

        await this.import(signifier)
      } catch (error) {
        this.app.warn(`Error importing`, signifier, `\n`, error)
      }
    }, Promise.resolve())
  }

  /**
   * Import an extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async import(signifier: string): Promise<Extension> {
    if (!this.filterApplicableExtensions([signifier]).length) return

    const extension = await this.app.module.import(signifier)
    const instance = this.instantiate(extension)
    this.set(instance)

    instance.dependsOn &&
      (await this.filterApplicableExtensions(
        Array.from(instance.dependsOn),
      ).reduce(async (promised: Promise<any>, signifier): Promise<any> => {
        await promised
        await this.import(signifier)
      }, Promise.resolve()))

    instance.dependsOnOptional &&
      (await this.filterApplicableExtensions(
        Array.from(instance.dependsOnOptional),
      ).reduce(async (promised: Promise<any>, signifier): Promise<any> => {
        try {
          await promised
          await this.import(signifier)
        } catch (err) {}
      }, Promise.resolve()))

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

      if (!extension[methodName.replace('_', '')]) return this

      extension.logger.log(
        chalk.blue(extension.label),
        chalk.cyan(methodName),
      )

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
    extension: Modules[K & string],
    methodName:
      | '_init'
      | '_register'
      | '_boot'
      | '_afterConfig'
      | '_beforeBuild'
      | '_make',
  ): Promise<void> {
    if (extension.dependsOn && extension.dependsOn.size > 0) {
      await Array.from(extension.dependsOn).reduce(
        async (
          promised: Promise<any>,
          signifier: string,
        ): Promise<any> => {
          await promised

          try {
            if (!this.has(signifier)) {
              extension.logger.log('importing', chalk.blue(signifier))
              await this.import(signifier)
            }

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
            if (!this.has(dependency)) {
              extension.logger.log(
                'attempting to import optional dependency',
                chalk.blue(dependency),
              )
              await this.import(dependency)
            }

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
        if (this.has(extension.label)) return

        this.set(extension)

        await this.run(extension, '_init')
        await this.run(extension, '_register')
        await this.run(extension, '_boot')

        return Promise.resolve()
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
