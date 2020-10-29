import {lodash as _} from '@roots/bud-support'

import type {FileContainer} from '@roots/filesystem'
import {Indexed as Container} from '@roots/container'

import logger from './util/logger'
import format from './util/format'
import pretty from './util/pretty'

export class Bud implements Framework.Bud {
  [key: string]: any // 🚨

  public build: Framework.Build

  public cli: Framework.CLI.Controller

  public compiler: Framework.Compiler

  public disk: Framework.FileSystem

  public env: Framework.Env

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

    this.params = params

    this.register({
      api: this.params?.api ?? null,
      builders: this.params?.builders ?? null,
      containers: this.params?.containers ?? null,
      services: this.params?.services?.bind(this)() ?? null,
      plugins: this.params?.plugins ?? null,
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

  public run = function (this: Framework.Bud): void {
    this.compiler.compile()

    if (this.mode.is('development')) {
      this.server.addDevMiddleware()

      this.server.getConfigItem('hot') &&
        this.server.addHotMiddleware()

      !_.isUndefined(this.server.getConfigItem('proxy')) &&
        this.server.addProxyMiddleware()
    }

    this.cli.run()
  }

  /**
   * Assign values.
   */
  public assign(value: unknown): void {
    Object.assign(this, {value})
  }

  /**
   * Set values.
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
}
