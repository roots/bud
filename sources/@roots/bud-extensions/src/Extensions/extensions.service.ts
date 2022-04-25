import {
  Extension,
  Extensions as Contract,
  ModuleDefinitions,
  Modules,
  Service,
} from '@roots/bud-framework'
import {Controllers} from '@roots/bud-framework/types/registry'
import {bind, chalk} from '@roots/bud-support'

import {Controller} from '../Controller'

/**
 * Extensions Service
 *
 * @public
 */
export class Extensions extends Service implements Contract.Service {
  public repository: Controllers = {}

  @bind
  public has<K extends keyof this['repository']>(
    key: K & string,
  ): boolean {
    return this.repository[key] ? true : false
  }

  @bind
  public get<K extends keyof this['repository']>(key: K & string) {
    return this.repository[key]
  }

  @bind
  public remove<K extends keyof this['repository']>(
    key: K & string,
  ): this {
    delete this.repository[key]
    return this
  }

  @bind
  public set<K extends keyof this['repository']>(
    value: Controller<Modules[K & string], ModuleDefinitions[K & string]>,
  ): this {
    value
      .get('logger')
      .log(`setting controller`, chalk.blue(value.get('label')))

    this.repository[value.get('label')] = value

    return this
  }

  @bind
  public makeController<K extends keyof this['repository']>(
    extension: Modules[K & string],
  ): Controller<Modules[K & string], ModuleDefinitions[K & string]> {
    return new Controller(this.app).setModule(extension)
  }

  @bind
  public async booted(): Promise<void> {
    this.app.options.extensions.map(this.makeController).map(this.set)

    await this.injectExtensions()

    await this.withAllControllers('init')
    await this.withAllControllers('register')
    await this.withAllControllers('boot')
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
  ): Promise<Controller<any, any>> {
    const pkgName = typeof input !== 'string' ? input.name : input
    if (this.has(pkgName)) return

    this.app.info(chalk.dim(`importing ${pkgName}`))

    const imported = await import(pkgName)
    const extension: Extension = imported.default
      ? imported.default
      : imported

    this.app.success(chalk.green(`imported ${pkgName}`))

    const controller = this.makeController(extension)

    if (this.has(controller.get('label'))) return
    this.set(controller)

    return controller
  }

  @bind
  public async withController<K extends keyof this['repository']>(
    controllerName: K & string,
    methodName: 'init' | 'register' | 'boot',
  ): Promise<this> {
    if (!this.has(controllerName)) {
      this.app.warn(
        methodName,
        'called on',
        controllerName,
        'but it could not be found',
      )
      return this
    }

    const controller = this.get(controllerName)

    if (
      controller.has('dependsOn') &&
      controller.get('dependsOn').size > 0
    ) {
      await Promise.all(
        Array.from(controller.get('dependsOn')).map(async packageName => {
          if (this.has(packageName)) return

          this.app.info(
            packageName,
            'has not been imported but it is required by',
            controller.get('label'),
          )

          try {
            await this.import(packageName)
          } catch (error) {
            this.app.error(
              controller.get('label'),
              'request for',
              packageName,
              'could not be fulfilled',
              '\n',
              error,
            )
          }
        }),
      )
    }

    try {
      await controller[methodName]()
      return this
    } catch (err) {
      this.app.error(err)
    }
  }

  /**
   * Execute a controller lifecycle method on all registered controllers
   *
   * @public
   */
  @bind
  public async withAllControllers(
    methodName: 'init' | 'register' | 'boot',
  ): Promise<Array<void>> {
    this.app.log(
      'calling',
      chalk.blue(methodName),
      'on all registered controllers',
    )

    return Promise.all(
      Object.values(this.repository).map(async controller => {
        await this.withController(controller.get('label'), methodName)
      }),
    )
  }

  /**
   * Add a {@link Controller} to the extensions repository
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async add(input: Extension | Array<Extension>): Promise<void> {
    const arrayed = Array.isArray(input) ? input : [input]

    await arrayed.reduce(async (promised, extension) => {
      await promised

      try {
        const controller = this.makeController(extension)
        this.set(controller)

        if (
          controller.has('dependsOn') &&
          controller.get('dependsOn').size > 0
        ) {
          Array.from(controller.get('dependsOn')).map(async name => {
            if (this.has(name)) {
              this.app.info({
                prefix: `skipping dependency import`,
                message: `${name} has already been imported`,
              })
              return
            }

            const dependency = await this.app.module.import(name)

            !dependency
              ? this.app.warn(`${dependency} import?`)
              : await this.add(dependency)
          })
        }

        await this.withController(controller.get('label'), 'init')
        await this.withController(controller.get('label'), 'register')
        await this.withController(controller.get('label'), 'boot')

        return true
      } catch (err) {
        this.app.error(err)
        return false
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
        async (controller: Controller<any, any>) => {
          const result = await controller.make()
          if (!result) return

          this.app.success(
            controller.get('label'),
            `will be used in the compilation`,
          )

          return result
        },
      ),
    ).then(res => res.filter(Boolean))
  }
}
