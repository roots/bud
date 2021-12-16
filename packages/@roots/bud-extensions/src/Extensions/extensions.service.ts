import {
  Extension,
  Extensions as Base,
  Framework,
  Service,
} from '@roots/bud-framework'
import {chalk} from '@roots/bud-support'

import {Controller} from '../Controller'
import {bind} from './extensions.dependencies'

/**
 * Extensions Service
 *
 * @remarks
 * Manages extension controllers
 *
 * @public
 */
export class Extensions extends Service implements Base {
  public queue = []

  public repository = {}

  public rejected = []

  /**
   * Controller factory
   *
   * @public
   */
  @bind
  public makeController(
    extension: Extension.Module | Promise<Extension.Module>,
  ): Controller {
    const controller = new Controller(this.app, extension)
    return controller
  }

  /**
   * @override
   * @public
   */
  @bind
  public async registered(): Promise<void> {
    this.log('time', 'instantiating built-ins')

    await Promise.all(
      this.getEntries().map(async ([key, extension]) => {
        this.setController(extension)
        this.log('success', {
          message: `${key} instantiated`,
        })
      }),
    )

    this.log('timeEnd', 'instantiating built-ins')
  }

  /**
   * @override
   * @public
   */
  @bind
  public async boot(): Promise<void> {
    if (this.app.store.is('features.inject', false)) {
      this.log('log', 'injection disabled')
      return
    }

    this.log('await', 'injecting project extensions')

    await Promise.all(
      this.app.project
        .getEntries('extensions')
        .map(async ([k, extension]) => {
          this.log('log', `...importing ${extension.name}`)

          const importedExt = await import(extension.name)

          if (this.has(importedExt.name)) {
            this.log(
              'log',
              `...${importedExt.name} already added`,
            )
          }

          await this.setController(importedExt)
        }),
    )

    await this.app.project
      .getKeys('extensions')
      .reduce(async (promised, key) => {
        await promised
        return this.registerExtension(key)
      }, Promise.resolve())

    await this.app.project
      .getKeys('extensions')
      .reduce(async (promised, key) => {
        await promised
        await this.bootExtension(key)
      }, Promise.resolve())
  }

  @bind
  public async setController(extension): Promise<void> {
    if (this.rejected.includes(extension.name)) {
      return
    }

    if (
      this.app.project.get(
        `extensions.${extension.name}.missingExtensions`,
      )?.length > 0 ||
      this.app.project.get(
        `extensions.${extension.name}.missingPeers`,
      )?.length > 0
    ) {
      this.log(
        'error',
        `
${chalk.underline`${extension.name} has missing dependencies`}

To prevent errors this extension will not be booted. However, bud will still continue trying to build the project.

You should fix this by running:

$ bud install

Alternatively...
${
  this.app.project.get(
    `extensions.${extension.name}.missingExtensions`,
  ).length
    ? `Ensure the following extensions are installed:
  ${this.app.project
    .getEntries(`extensions.${extension.name}.missingExtensions`)
    .reduce(
      (acc, curr) => (curr ? `${acc}- ${curr}\n` : acc),
      `\n`,
    )}`
    : ``
}
${
  this.app.project.get(
    `extensions.${extension.name}.missingPeers`,
  ).length
    ? `Ensure the following peers are installed:
  ${this.app.project
    .getValues(`extensions.${extension.name}.missingPeers`)
    .reduce(
      (acc, pkg) => `${acc}- ${pkg.name}@${pkg.version}\n`,
      `\n`,
    )}`
    : ``
}`,
      )

      this.rejected.push(extension.name)
      return
    }

    const controller = this.makeController(extension)

    this.set(controller.name, controller)
  }

  /**
   * @public
   */
  @bind
  public async extensionLifecycle(): Promise<void> {
    await this.registerExtensions()
    await this.bootExtensions()
  }

  /**
   * @public
   */
  @bind
  public async registerExtension(key: string): Promise<void> {
    try {
      const controller = this.get<Controller>(key)
      if (!controller) return

      await controller.mixin()
      await controller.api()
      await controller.register()
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * @public
   */
  @bind
  public async bootExtension(key: string): Promise<void> {
    try {
      const controller = this.get<Controller>(key)
      if (!controller) {
        return
      }
      await controller.boot()
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * @public
   */
  @bind
  public async registerExtensions(): Promise<void> {
    this.log('time', 'registering')

    await this.getKeys().reduce(async (promised, controller) => {
      await promised
      await this.registerExtension(controller)
    }, Promise.resolve())

    this.log('timeEnd', 'registering')
  }

  /**
   * @public
   */
  @bind
  public async bootExtensions(): Promise<void> {
    this.log('time', 'booting')
    await this.getKeys().reduce(async (promised, controller) => {
      await promised
      await this.bootExtension(controller)
    }, Promise.resolve())
    this.log('timeEnd', 'booting')
  }

  /**
   * Queue an extension to be added to the container before the build process.
   *
   * @remarks
   * Useful for extensions which cannot be added in an awaitable context (like a user config)
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public enqueue(extension: Extension.Module): Framework {
    if (
      this.has(extension.name) ||
      this.queue.some(queued => queued.name === extension.name)
    ) {
      this.log(
        'warn',
        `${extension.name} already added. skipping.`,
      )
      return
    }

    this.queue.push(extension)

    return this.app
  }

  /**
   * Add a {@link Controller} to the container
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async add(extension: Extension.Module): Promise<void> {
    if (this.has(extension.name)) {
      return
    }

    await this.setController(extension)
    await this.registerExtension(extension.name)
    await this.bootExtension(extension.name)
  }

  @bind
  public async lifecycle() {
    await Promise.all(
      Object.entries(this.all()).map(
        async ([name, controller]: [string, Controller]) => {
          await this.registerExtension(name)
        },
      ),
    )

    await Promise.all(
      Object.entries(this.all()).map(
        async ([name, controller]: [string, Controller]) => {
          await this.bootExtension(name)
        },
      ),
    )
  }

  /**
   * @public
   */
  @bind
  public async processQueue(): Promise<void> {
    if (!this.queue.length) return

    this.queue = await Promise.all(
      this.queue.map(async extension => {
        await (this.app as any).use(extension)
      }),
    )

    this.queue = []
  }

  /**
   * Returns an array of plugin instances which have been registered to the
   * Extensions container and are set to be used in the compilation
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

    await this.processQueue()

    this.app.dump(this.getKeys())

    const plugins = this.getValues()
      .filter(controller => controller._module.make)
      .map((controller: Controller) => {
        const result = controller.make()

        if (!result) {
          this.log(
            'log',
            `${controller.name} will not be used in the compilation`,
          )

          return result
        }

        this.log(
          'success',
          `${controller.name} will be used in the compilation`,
        )

        return result
      })
      .filter(Boolean)

    this.log('timeEnd', 'extensions.make')

    return plugins
  }
}
