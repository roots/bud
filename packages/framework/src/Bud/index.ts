import type {FileContainer} from '@roots/filesystem'
import {Indexed as Container} from '@roots/container'

import * as api from '@roots/bud-api'
import * as containers from './containers'
import * as env from './env'
import * as plugins from './plugins'

import {builders, Builders} from './builders'
import {services, IServices} from './services'

import logger from './util/logger'
import format from './util/format'
import pretty from './util/pretty'

export class Bud implements Framework.Bud {
  [key: string]: any // 🚨

  private static PRIMARY_DISK = 'project'

  public build: Framework.Build

  public cli: Framework.CLI.Controller

  public compiler: Framework.Compiler

  public disk: Framework.FileSystem

  public env: Framework.Env = env

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
    containers?: Framework.Index<Framework.Index<any>>
    services?: IServices
  }) {
    this.set = this.set.bind(this)
    this.mapCallables = this.mapCallables.bind(this)
    this.mapBuilders = this.mapBuilders.bind(this)
    this.mapContainers = this.mapContainers.bind(this)
    this.mapServices = this.mapServices.bind(this)

    this.register({
      api: params?.api ?? api,
      builders: params?.builders ?? builders,
      containers: params?.containers ?? containers,
      services: (params?.services ?? services).bind(this)(),
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
  }: {
    api: Framework.Index<[string, CallableFunction]>
    builders: Builders
    containers: Framework.Index<Framework.Index<any>>
    services: IServices
  }): void {
    this.mapServices(services)
    this.mapContainers(containers)
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
  public mapBuilders = async function (
    this: Framework.Bud,
    builders: Builders,
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
    services: IServices,
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
