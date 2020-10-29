import type {FileContainer} from '@roots/filesystem'
import {Indexed as Container} from '@roots/container'

import webpack from 'webpack'
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

  public instances: Framework.Index<Framework.Bud> = {}

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

    this.setup()
  }

  public new = function (
    this: Framework.Bud,
    name: string,
    params = {},
  ): Framework.Bud {
    this.instances[name] = new Bud({
      ...this.params,
    })

    this.instances[name].build.make()

    return this.instances[name]
  }

  public get = function (name: string): Framework.Bud {
    return this.instances[name]
  }

  public delete = function (name: string): void {
    delete this.instances[name]
  }

  public with = function (
    name: string,
    userConfig: (bud: Framework.Bud) => void,
  ): void {
    userConfig(this.get(name))
  }

  public isMultiCompilation = function (): boolean {
    return Object.entries(this.instances).length > 0
  }

  public run = function (this: Framework.Bud) {
    if (this.isMultiCompilation()) {
      this.compiler.setCompilation(
        webpack(
          Object.entries(this.instances).reduce(
            (
              multi: Framework.Webpack.Configuration[],
              [, instance]: [string, Framework.Bud],
            ) => {
              multi.push(instance.build.make())
              return multi
            },
            [],
          ),
        ),
      )
    } else {
      this.compiler.compile()
    }

    if (this.mode.is('development')) {
      this.features.enabled('hot')
        ? this.server.addHotMiddleware()
        : this.server.addDevMiddleware()

      this.features.enabled('proxy') &&
        this.server.addProxyMiddleware()
    }

    this.cli.run()
  }

  public assign(value: unknown): void {
    Object.assign(this, {value})
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

  public setup = function (): void {
    this.disk.set('@roots', {
      baseDir: this.fs.path.resolve(__dirname, '../../'),
      glob: ['**/*'],
    })

    this.disk.set('project', {
      baseDir: process.cwd(),
      glob: ['**/*'],
    })

    this.projectPath(
      this.args.has('project')
        ? this.fs.path.resolve(
            this.disk.baseDir,
            this.args.get('project'),
          )
        : process.cwd(),
    )
    this.srcPath(
      this.args.has('src') ? this.args.get('src') : 'src',
    )
    this.distPath(
      this.args.has('dist') ? this.args.get('dist') : 'dist',
    )

    this.features.enabled('html') && this.template()

    this.features.enabled('minify') && this.minify()

    this.features.enabled('gzip') && this.gzip()

    this.features.enabled('brotli') && this.brotli()

    this.features.enabled('hash') && this.hash()

    this.features.enabled('runtime') && this.runtime()

    this.features.enabled('vendor') && this.vendor()

    this.features.enabled('devtool') &&
      (() => {
        this.devtool(
          this.args.get('devtool') ?? '#@cheap-eval-source-map',
        )
      })
  }
}
