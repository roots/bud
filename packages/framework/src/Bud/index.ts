import type {FileContainer} from '@roots/filesystem'
import {Indexed as Container} from '@roots/container'

import * as env from './env'
import {args} from './args'

import logger from './util/logger'
import format from './util/format'
import pretty from './util/pretty'

export class Bud implements Framework.Bud {
  [key: string]: any // 🚨

  private static PRIMARY_DISK = 'project'

  public args: Framework.Index<unknown> = args

  public build: Framework.Build

  public cli: Framework.CLI.Controller

  public compiler: Framework.Compiler

  public compilations: Framework.Container = new Container()

  public disk: Framework.FileSystem

  public env: Framework.Env = env

  public extensions: Framework.Extensions

  public features: Framework.Features

  public fs: FileContainer

  public hooks: Framework.Hooks

  public logger: Framework.Logger = logger

  public mode: Framework.Mode

  public presets: Framework.Container = new Container()

  public server: Framework.Server

  public util: Framework.Util = {
    format,
    pretty,
  }

  public constructor(params?: {
    api?: Framework.Index<[string, CallableFunction]>
    builders?: Framework.Builders
    containers?: Framework.Index<Framework.Index<any>>
    plugins?: Framework.Index<Framework.Extension>
    services?: Framework.Services
  }) {
    this.set = this.set.bind(this)
    this.register = this.register.bind(this)
    this.mapCallables = this.mapCallables.bind(this)
    this.mapBuilders = this.mapBuilders.bind(this)
    this.mapContainers = this.mapContainers.bind(this)
    this.mapServices = this.mapServices.bind(this)

    this.register({
      api: params?.api ?? null,
      builders: params?.builders ?? null,
      containers: params?.containers ?? null,
      services: params?.services?.bind(this)() ?? null,
      plugins: params?.plugins ?? null,
    })
  }

  /**
   * Initialize class.
   */
  public register = function ({
    api,
    builders,
    containers,
    services,
    plugins,
  }: {
    api?: Framework.Index<[string, CallableFunction]>
    builders?: Framework.Builders
    containers?: Framework.Index<Framework.Index<any>>
    services?: Framework.Services
    plugins?: Framework.Index<Framework.Extension>
  }): void {
    services && this.mapServices(services)
    containers && this.mapContainers(containers)
    builders && this.mapBuilders(builders)
    api && this.mapCallables(api)

    plugins && this.extensions.boot(plugins)
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
  public mapBuilders = async function (
    this: Framework.Bud,
    builders: Framework.Builders,
  ): Promise<void> {
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
   * Map api callables and top-level utilities
   */
  public mapCallables = async function (
    callables: Framework.Index<CallableFunction>,
  ): Promise<void> {
    Object.entries(callables).map(
      ([name, fn]: [string, CallableFunction]) => {
        this.set(name, fn.bind(this))
      },
    )
  }

  /**
   * Map services to Framework.
   */
  public mapServices = async function (
    this: Framework.Bud,
    services: Framework.Services,
  ): Promise<void> {
    Object.entries(services).map(
      ([name, [service, dependencies]]) => {
        this.set(name, new service(dependencies))
      },
    )
  }

  /**
   * Map container objects
   */
  public mapContainers = async function (
    containers: Framework.Index<Framework.Index<any>>,
  ): Promise<void> {
    Object.entries(containers).map(
      ([name, repository]: [string, Framework.Index<any>]) => {
        this.set(name, new Container(repository))
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
