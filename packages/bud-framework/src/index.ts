import Container from '@roots/container'

import Filesystem from '@roots/filesystem'

import PluginController, {
  Plugin,
  PluginConditional,
  PluginInterface,
  PluginMake,
  PluginOptions,
} from './PluginController'

import {
  dump,
  format,
  pretty,
  highlight,
  logger,
  notify,
  processHandler,
  terminate,
} from './util'

import {hooks, Hooks} from './hooks'

interface Loose {
  [key: string]: any | any[] | undefined | CallableFunction
}

export type {
  Hooks,
  Plugin,
  PluginConditional,
  PluginInterface,
  PluginMake,
  PluginOptions,
}

interface FrameworkInterface extends Loose {
  [property: string]: any | any[]

  dump: typeof dump

  terminate: typeof terminate

  logger: typeof logger

  util: {
    dump: typeof dump
    format: typeof format
    highlight: typeof highlight
    notify: typeof notify
    pretty: typeof pretty
    terminate: typeof terminate
  }

  apply: (key: string, value: Loose) => void

  makeContainer: (repo?: Loose) => Container
  makeHooks: (app: FrameworkInterface) => Hooks
  makeDisk: (baseDir?: string, pattern?: string[]) => Filesystem
  makePluginController: (plugin: Plugin) => PluginController
}

process.on('unhandledRejection', processHandler)

class Framework implements FrameworkInterface {
  public dump = dump
  public terminate = terminate

  public logger = logger

  public util = {
    dump,
    format,
    highlight,
    notify,
    pretty,
    terminate,
  }

  public constructor() {
    this.apply = this.apply.bind(this)
    this.makePluginController = this.makePluginController.bind(
      this,
    )
  }

  public apply(key: PropertyKey, value: any): void {
    Object.defineProperty(this, key, value)
  }

  public makeContainer(repo?: Loose): Container {
    return new Container(repo ?? {})
  }

  public makeDisk(
    baseDir?: string,
    pattern?: string[],
  ): Filesystem {
    const disk = new Filesystem(baseDir ?? undefined)
    pattern && disk.setDisk(pattern)

    return disk
  }

  public makeHooks(app: FrameworkInterface): Hooks {
    return hooks(app)
  }

  public makePluginController(plugin: Plugin): PluginController {
    return new PluginController(this, plugin)
  }
}

export {Framework as default, Loose, FrameworkInterface}
