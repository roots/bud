import {Container} from '@roots/container'
import {Compiler} from '@roots/bud-compiler'
import {FileContainer, FileSystem} from '@roots/filesystem'

import {App} from '@roots/bud-cli'
import {Build} from '../Build'
import {Hooks} from '../Hooks'
import {Extensions} from '../Extensions'
import {Features} from '../Features'
import {Mode} from '../Mode'
import {Server} from '@roots/bud-server'

import * as api from '@roots/bud-api'
import * as args from './args'
import * as env from './env'
import * as items from './items'
import * as rules from './rules'
import * as patterns from './patterns'
import * as plugins from './plugins'
import * as loaders from './loaders'

import format from './util/format'
import pretty from './util/pretty'

export class Bud implements Framework.Bud {
  /**
   * @note I'm not sure how to type something this flexible.
   */
  [key: string]: any

  private static PRIMARY_DISK = 'project'

  public app: CLI.ControllerInterface

  public build: Framework.Build

  public compiler: Framework.Bud['compiler']

  public disk: Framework.Bud['disk']

  public env: Framework.Env

  public fs: FileContainer

  public extensions: Framework.Bud['extensions']

  public features: Framework.Features

  public hooks: Framework.Bud['hooks']

  public mode: Framework.Mode

  public server: Framework.Bud['server']

  public logger: Framework.Bud['logger']

  public mode: Framework.Bud['mode']

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
    this.env = env
    this.hooks = Hooks(this.logger)
    this.args = new Container(args)
    this.build = new Build(this)
    this.compiler = new Compiler(this)
    this.server = new Server(this)
    this.disk = new FileSystem()
    this.extensions = new Extensions(this)
    this.features = new Features()
    this.fs = new FileContainer()
    this.patterns = new Container(patterns)
    this.app = App(this)

    this.init()
  }

  /**
   * Initialize class.
   */
  public init: Framework.Bud['init'] = function () {
    this.mode = Mode(this.build.config)

    Object.entries(api).map(
      ([name, fn]: [string, CallableFunction]) => {
        this[name] = fn.bind(this)
      },
    )

    Object.entries(loaders).map(
      ([name, loader]: [string, Framework.Build.Loader]) => {
        return this.build.setLoader(name, loader)
      },
    )

    Object.entries(items).map(
      ([name, item]: [string, Framework.Item.Module]) => {
        return this.build.setItem(name, item)
      },
    )

    Object.entries(rules).map(
      ([name, rule]: [string, Framework.Rule.Module]) => {
        return this.build.setRule(name, rule)
      },
    )

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
    return this.disk.set(key, {
      baseDir,
      glob,
    })
  }
}
