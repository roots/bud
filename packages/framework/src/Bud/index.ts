import Compiler from '@roots/bud-compiler'
import {Build} from '../Build'
import Env from './env'
import Hooks from '../Hooks'
import {Extensions} from '../Extensions'
import {FileContainer, FileSystem} from '@roots/filesystem'
import Mode from './mode'
import {Server, ServerModel} from '@roots/bud-server'
import Store from '../Store'

import * as api from '@roots/bud-config'
import * as items from './items'
import * as model from '../Model'
import * as rules from './rules'
import * as plugins from './plugins'
import * as loaders from './loaders'

import format from './util/format'
import pretty from './util/pretty'

class Bud implements Framework.Bud {
  /**
   * @note I'm not sure how to type something this flexible.
   */
  [key: string]: any

  private static PRIMARY_DISK = 'project'

  public build: Framework.Build

  public compiler: Framework.Bud['compiler']

  public disks: Framework.Bud['disks']

  public env: Framework.Env

  public extensions: Framework.Bud['extensions']

  public fs: Framework.Bud['fs']

  public hooks: Framework.Bud['hooks']

  public server: Framework.Bud['server']

  public logger: Framework.Bud['logger']

  public mode: Framework.Bud['mode']

  public store: Framework.Bud['store']

  public util: Framework.Bud['util'] = {
    format,
    pretty,
  }

  /**
   * Creates an instance of Bud.
   *
   * @memberof Bud
   */
  public constructor() {
    this.env = Env
    this.hooks = Hooks(this.logger)
    this.components = new Store()
    this.store = new Store()
    this.build = new Build(this)
    this.extensions = new Extensions(this)
    this.disks = new FileSystem()
    this.fs = new FileContainer()
    this.compiler = new Compiler()
    this.server = new Server()

    this.init()
  }

  /**
   * Initialize class.
   */
  public init: Framework.Bud['init'] = function () {
    /**
     * Load the Bud.Store with initial models.
     */
    Object.entries(model).map(([name, model]) => {
      this.store.create(name, model)

      this[name] = this.store[name]
    })

    this.store.create('server', ServerModel)

    this.mode = new Mode(this.build.config)

    Object.entries(api).map(
      ([name, fn]: [string, CallableFunction]) => {
        this[name] = fn.bind(this)
      },
    )
    Object.entries(loaders).map(
      ([name, loader]: [string, Build.Loader]) => {
        return this.build.makeLoader(name, loader)
      },
    )
    Object.entries(items).map(
      ([name, item]: [string, Build.Item.Module]) => {
        return this.build.makeItem(name, item)
      },
    )
    Object.entries(rules).map(
      ([name, rule]: [string, Build.Rule.Module]) => {
        return this.build.makeRule(name, rule)
      },
    )

    // Boot webpack plugins.
    this.extensions.boot(plugins)
  }

  /**
   * Make a new disk virtual disk.
   */
  public makeDisk: Framework.Bud['makeDisk'] = function (
    key = Bud.PRIMARY_DISK,
    baseDir?,
    glob?,
  ): FileContainer {
    return this.disks.set(key, {
      baseDir,
      glob,
    })
  }

  /**
   * Load a disk in place of the current one.
   */
  public useDisk: Framework.Bud['useDisk'] = function (
    key = Bud.PRIMARY_DISK,
  ) {
    return this.disks.get(key)
  }

  /**
   * Make a container.
   */
  public makeContainer: Framework.Bud['makeContainer'] = function (
    baseDir,
  ) {
    return new FileContainer(baseDir ?? process.cwd())
  }
}

export {Bud}
