import {
  Extension,
  Extensions as Base,
  Framework,
  Service,
} from '@roots/bud-framework'
import {bind, lodash, once} from '@roots/bud-support'

import {Controller} from '../Controller/controller.service'
import {Importer} from './extensions.importer'
import {Lifecycle} from './extensions.lifecycle'

const {isString} = lodash

/**
 * Extensions Service
 *
 * @remarks
 * Manages extension controllers
 *
 * @public
 */
export class Extensions extends Service implements Base {
  /**
   * Queued modules
   *
   * @remarks
   * Bucket to hold modules when executing facades
   *
   * @public
   */
  public queue: Array<Extension.Module> = []

  /**
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async boot(): Promise<void> {
    this.getValues().map(controller => this.makeController(controller))

    const imports = await new Importer(
      this,
      this.app.project,
    ).mapManifests()

    imports.forEach(name =>
      this.log('info', {
        message: `${name.name} loaded`,
      }),
    )

    /**
     * Execute lifecycle for all
     */
    await new Lifecycle().run(this.all())
  }

  /**
   * Make a controller from an {@link Extension.Module}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public makeController(
    extension: Extension.Module,
    requires?: Array<string>,
  ): Controller {
    if (
      this.has(extension.name) &&
      this.isInstanceOf(extension.name, Controller)
    ) {
      this.log('warn', {
        message: `${extension.name} already exists`,
        suffix: `returning existing record.`,
      })
      return this.get(extension.name)
    }

    const controller = new Controller(this.app, extension, requires)
    this.set(controller.name, controller)
    return this.get(controller.name)
  }

  /**
   * Import an extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async import(
    extension: Extension.BudManifest | string,
  ): Promise<Extension.Module> {
    const name = isString(extension) ? extension : extension.name

    const importedModule = await import(name)
    return importedModule.default ?? importedModule
  }

  /**
   * Add a {@link Controller} to the container
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async add(extension: Extension.Module): Promise<Controller> {
    if (this.has(extension.name)) {
      this.log('info', `${extension.name} already exists. skipping.`)
      return this.get(extension.name)
    }

    try {
      await new Lifecycle().run({
        [extension.name]: this.makeController(extension),
      })
      return this.get(extension.name)
    } catch (error) {
      this.app.error(extension.name || 'unknown extension', error)
    }
  }

  /**
   * Queue an extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public enqueue(extension: Extension.Module): Framework {
    this.queue.push(extension)
    return this.app
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async processQueue(): Promise<void> {
    if (!this.queue?.length) return
    await Promise.all(this.queue.map(this.add))
    this.queue = []
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
  public async make(): Promise<
    {
      [key: string]: any
      apply: CallableFunction
    }[]
  > {
    this.log('time', 'extensions.make')

    this.queue.length && (await this.processQueue())

    const plugins = this.getValues()
      .filter(controller => controller?.module?.make)
      .map((controller: Controller) => {
        const result = controller.make()

        if (!result) {
          controller.logger.log(`discarded`)
          return result
        }

        controller.logger.success(`used in the compilation`)
        return result
      })
      .filter(Boolean)

    this.log('timeEnd', 'extensions.make')

    return plugins
  }
}
