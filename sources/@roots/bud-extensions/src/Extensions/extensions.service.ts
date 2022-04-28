import {
  Extension,
  Extensions as Contract,
  ModuleDefinitions,
  Modules,
  Service,
} from '@roots/bud-framework'
import {bind, chalk} from '@roots/bud-support'

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
    value
      .get('logger')
      .log(`setting extension`, chalk.blue(value.get('label')))

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
      this.app.log('injection disabled')
      return
    }

    this.app.info('injecting extensions')
    const dependencyKeys = Object.keys({
      ...(this.app.context.manifest?.devDependencies ?? {}),
      ...(this.app.context.manifest?.dependencies ?? {}),
    })

    return Promise.all(
      dependencyKeys.map(async (pkg, i) => {
        this.app.info('injecting', pkg)

        try {
          const manifestPath = await this.app.module.manifestPath(pkg)
          const manifest = await this.app.module.readManifest(manifestPath)

          if (!manifest?.bud) return

          await this.import(pkg)
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

    this.app.info(chalk.dim(`importing ${pkgName}`))

    const imported = await import(pkgName)
    const extensionModule: Extension = imported.default
      ? imported.default
      : imported

    this.app.success(chalk.green(`imported ${pkgName}`))

    const extension = this.instantiate(extensionModule)

    if (this.has(extension.get('label'))) return
    this.set(extension)

    return extension
  }

  @bind
  public async run<K extends Modules>(
    extension: Modules[K & string],
    methodName: '_init' | '_register' | '_boot' | '_beforeBuild' | '_make',
  ): Promise<this> {
    if (extension.meta[methodName] === true) return this
    extension.meta[methodName] = true

    try {
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
        Array.from(extension.dependsOn).map(async pkgName => {
          try {
            if (!this.app.extensions.has(pkgName))
              await this.app.extensions.import(pkgName)

            if (this.app.extensions.has(pkgName)) {
              await this.app.extensions.run(
                this.app.extensions.get(pkgName),
                methodName,
              )
            }
          } catch (error) {
            this.app.error(
              `before calling \`${methodName}\` ${this.get(
                'label',
              )} tried to import \`${pkgName}\` but encountered an error.`,
              error,
            )
          }
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
    this.app.log(
      'calling',
      chalk.blue(methodName),
      'on all registered extensions',
    )

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
        this.set(extension)

        await this.run(extension, '_init')
        await this.run(extension, '_register')
        await this.run(extension, '_boot')

        return Promise.resolve()
      } catch (err) {
        this.app.error(err)
        return Promise.resolve()
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
  public async make(): Promise<Extension.PluginInstance[]> {
    return await Promise.all(
      Object.values(this.repository).map(
        async extension => await extension._make(),
      ),
    ).then(res => res.filter(Boolean))
  }
}
