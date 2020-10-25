import {Indexed as Container} from '@roots/container'
import {Compiler} from '@roots/bud-compiler'
import {FileContainer, FileSystem} from '@roots/filesystem'

import {App} from '@roots/bud-cli'
import {Build} from '../Build'
import {Hooks} from '../Hooks'
import {Extensions} from '../Extensions'
import {Features} from '../Features'
import {Mode} from '../Mode'
import {Server} from '@roots/bud-server'

import {args} from './args'
import * as env from './env'
import * as patterns from './patterns'
import * as plugins from './plugins'

import * as api from '@roots/bud-api'
import {builders, Builders} from './builders'

import logger from './util/logger'
import format from './util/format'
import pretty from './util/pretty'

export class Bud implements Framework.Bud {
  /**
   * @note I'm not sure how to type something this flexible.
   */
  [key: string]: any

  private static PRIMARY_DISK = 'project'

  public build: Framework.Build

  public cli: Framework.CLI.Controller

  public compiler: Framework.Compiler

  public disk: Framework.FileSystem

  public env: Framework.Env

  public fs: FileContainer

  public extensions: Framework.Extensions

  public features: Framework.Features

  public hooks: Framework.Hooks

  public mode: Framework.Mode

  public server: Framework.Bud['server']

  public mode: Framework.Bud['mode']

  public logger: Framework.Bud['logger'] = logger

  public util: Framework.Util = {
    format,
    pretty,
  }

  public constructor(params: {
    api?: Framework.Index<[string, CallableFunction]>
    builders?: Builders
  }) {
    // Bindings
    this.set = this.set.bind(this)
    this.mapCallables = this.mapCallables.bind(this)
    this.mapBuilders = this.mapBuilders.bind(this)

    // Foundation instances
    this.env = env
    this.disk = new FileSystem()
    this.fs = new FileContainer()
    this.features = new Features()

    // Containers
    this.args = new Container(args)
    this.patterns = new Container(patterns)

    // Feature objects
    this.hooks = new Hooks({logger: this.logger})
    this.build = new Build({bud: this})
    this.compiler = new Compiler({bud: this})
    this.server = new Server({bud: this})
    this.extensions = new Extensions({bud: this})
    this.mode = Mode(this.build)
    this.cli = App(this)

    // Registration
    this.register({
      api: params?.api ?? api,
      builders: params?.builders ?? builders,
    })
  }

  /**
   * Initialize class.
   */
  public register = function ({
    api,
    builders,
  }: {
    api: Framework.Index<[string, CallableFunction]>
    builders: Builders
  }): void {
    this.mapBuilders(builders)
    this.mapCallables(api)

    this.args.entries().map(([arg, value]) => {
      this.features.set(arg, value ? true : false)
    })

    this.extensions.boot(plugins)
  }

  /**
   * Set on Bud.
   */
  public set(key: string, value: unknown): void {
    this[key] = value
  }

  /**
   * Map builders
   */
  public mapBuilders = function (
    this: Framework.Bud,
    builders: Builders,
  ): void {
    builders.map(
      ([builderSet, registration]: [
        Framework.Index<any>,
        (any) => void,
      ]) => {
        Object.entries(builderSet).map((builder: any) =>
          registration.bind(this)(builder),
        )
      },
    )
  }

  /**
   * Map api callables and top-level utility objects onto bud
   */
  public mapCallables = function (
    callables: Framework.Index<CallableFunction>,
  ): void {
    Object.entries(callables).map(
      ([name, fn]: [string, CallableFunction]) => {
        this.set(name, fn.bind(this))
      },
    )
  }

  /**
   * Make a new disk virtual disk.
   */
  public makeDisk = function (
    key = Bud.PRIMARY_DISK,
    baseDir?: string,
    glob?: string[],
  ): FileContainer {
    return this.disk.set(key, {
      baseDir,
      glob,
    })
  }
}
