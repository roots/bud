import {
  Extension,
  Extensions as Contract,
  ModuleDefinitions,
  Modules,
  Service,
} from '@roots/bud-framework'
import {bind, chalk, lodash as _} from '@roots/bud-support'

const {noop} = _

/**
 * Extensions Service
 *
 * @public
 */
export class Extensions extends Service implements Contract.Service {
  public repository: Modules = {}

  @bind
  public async booted(): Promise<void> {
    this.app.options.extensions.map(this.instantiate).map(this.set)

    await this.injectExtensions()

    await this.runAll('_init')
    await this.runAll('_register')
    await this.runAll('_boot')
    await this.runAll('_beforeBuild')
  }

  @bind
  public has<K extends keyof Modules>(key: K & string): boolean {
    return this.repository[key] ? true : false
  }

  @bind
  public get<K extends keyof Modules>(key: K & string) {
    return this.repository[key]
  }

  @bind
  public remove<K extends keyof Modules>(key: K & string): this {
    delete this.repository[key]
    return this
  }

  @bind
  public set<K extends Modules>(value: Modules[K & string]): this {
    value.logger.log(`setting extension`, chalk.blue(value.label))

    this.repository[value.label] = value

    return this
  }

  @bind
  public instantiate<K extends Modules>(
    extension: Modules[K & string] | ModuleDefinitions[K & string],
  ): Modules[K & string] {
    return typeof extension === 'function'
      ? new extension(this.app)
      : !(extension instanceof Extension)
      ? new Extension(this.app).fromObject(extension)
      : extension
  }

  @bind
  public async injectExtensions() {
    if (this.app.hooks.filter('feature.inject') === false) {
      return this.app.log('injection disabled')
    }

    this.app.log('injecting extensions')

    return Promise.all(
      Object.keys({
        ...(this.app.context.manifest?.devDependencies ?? {}),
        ...(this.app.context.manifest?.dependencies ?? {}),
      }).map(async pkg => {
        try {
          const manifest = await this.app.module
            .manifestPath(pkg)
            .then(this.app.module.readManifest)

          return manifest.bud ? await this.import(pkg) : noop
        } catch (error) {
          this.app.error(`Error importing`, pkg, `\n`, error)
        }
      }),
    )
  }

  @bind
  public async import(
    input: Record<string, any> | string,
  ): Promise<Extension> {
    const pkgName = typeof input !== 'string' ? input.name : input
    if (this.has(pkgName)) return

    this.app.log(chalk.dim(`importing ${pkgName}`))

    const imported = await import(pkgName)
    const extensionModule: Extension = imported.default
      ? imported.default
      : imported

    this.app.success(chalk.green(`imported ${pkgName}`))

    const extension = this.instantiate(extensionModule)

    if (this.has(extension.label)) return
    this.set(extension)

    return extension
  }

  @bind
  public async run<K extends Modules>(
    extension: Modules[K & string],
    methodName: '_init' | '_register' | '_boot' | '_beforeBuild' | '_make',
  ): Promise<this> {
    if (extension.meta[methodName] === true) return this
    else extension.meta[methodName] = true

    try {
      extension.logger.log(
        'running',
        chalk.blue(extension.label),
        chalk.cyan(methodName),
      )
      await this.runDependencies(extension, methodName)
      await extension[methodName]()
      await this.app.api.processQueue()

      return this
    } catch (err) {
      this.app.error(err)
    }
  }

  @bind
  public async runDependencies<K extends Modules>(
    extension: Modules[K & string],
    methodName: '_init' | '_register' | '_boot' | '_beforeBuild' | '_make',
  ): Promise<void> {
    if (extension.dependsOn && extension.dependsOn.size > 0) {
      await Promise.all(
        Array.from(extension.dependsOn).map(async dependency => {
          try {
            if (!this.app.extensions.has(dependency)) {
              extension.logger.log('importing', chalk.blue(dependency))
              await this.import(dependency)
            }

            await this.run(this.get(dependency), methodName)
          } catch (error) {
            this.app.error(
              `before calling \`${methodName}\` ${this.get(
                'label',
              )} tried to import \`${dependency}\` but encountered an error.`,
              error,
            )
          }
        }),
      )
    }

    if (
      extension.dependsOnOptional &&
      extension.dependsOnOptional.size > 0
    ) {
      await Promise.all(
        Array.from(extension.dependsOnOptional).map(async dependency => {
          try {
            if (!this.app.extensions.has(dependency)) {
              extension.logger.log(
                'attempting to import optional dependency',
                chalk.blue(dependency),
              )
              await this.import(dependency)
            }

            await this.run(this.get(dependency), methodName)
          } catch (error) {}
        }),
      )
    }
  }

  /**
   * Execute a extension lifecycle method on all registered extensions
   *
   * @public
   */
  @bind
  public async runAll(
    methodName: '_init' | '_register' | '_boot' | '_beforeBuild' | '_make',
  ): Promise<Array<void>> {
    return Promise.all(
      Object.values(this.repository).map(async extension => {
        await this.run(extension, methodName)
      }),
    )
  }

  /**
   * Add a {@link Extension} to the extensions repository
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async add(input: Extension | Array<Extension>): Promise<void> {
    const arrayed = Array.isArray(input) ? input : [input]

    await arrayed.reduce(async (promised, rawExtension) => {
      await promised

      try {
        const extension = this.instantiate(rawExtension)
        if (this.has(extension.label)) return

        this.set(extension)

        await this.run(extension, '_init')
        await this.run(extension, '_register')
        await this.run(extension, '_boot')
        await this.run(extension, '_beforeBuild')

        return Promise.resolve(true)
      } catch (err) {
        this.app.error(err)
        return Promise.reject()
      }
    }, Promise.resolve(true))
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
  public async make(): Promise<Extension.PluginInstance[]> {
    return await Promise.all(
      Object.values(this.repository).map(
        async extension => await extension._make(),
      ),
    ).then(res => res.filter(Boolean))
  }
}
