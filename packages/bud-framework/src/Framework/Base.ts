import {Container} from '@roots/container'
import {use} from './use'
import {when} from './when'
import {Framework} from '@roots/bud-typings'

export default abstract class implements Framework {
  protected _providers: Container<Framework.Providers>

  protected _api: Container = new Container<CallableFunction>({})

  protected _services: Container = new Container({})

  protected _store: Container<Container> = new Container({})

  public args: Framework.Container

  public config: Framework.Container

  public features: Framework.Container

  public patterns: Framework.Container

  public presets: Framework.Container

  public serverConfig: Framework.Container

  public build: Framework.Build

  public cache: Framework.Cache

  public cli: Framework.CLI

  public compiler: Framework.Compiler

  public disk: Framework.FileSystem

  public env: Framework.Env

  public extensions: Framework.Extensions

  public fs: Framework.FileContainer

  public hooks: Framework.Hooks

  public logger: Framework.Logger

  public mode: Framework.Mode

  public server: Framework.Server

  public use: Framework.Use = use

  public when: Framework.When = when

  public addPlugin: Framework.Api.AddPlugin

  public alias: Framework.Api.Alias

  public copy: Framework.Api.Copy

  public define: Framework.Api.Define

  public dev: Framework.Api.Dev

  public devtool: Framework.Api.Devtool

  public dist: Framework.Api.Dist

  public distPath: Framework.Api.DistPath

  public entry: Framework.Api.Entry

  public externals: Framework.Api.Externals

  public glob: Framework.Api.Glob

  public gzip: Framework.Api.Gzip

  public hash: Framework.Api.Hash

  public minify: Framework.Api.Minify

  public project: Framework.Api.Project

  public projectPath: Framework.Api.ProjectPath

  public provide: Framework.Api.Provide

  public proxy: Framework.Api.Proxy

  public publicPath: Framework.Api.PublicPath

  public run: Framework.Api.Run

  public runtime: Framework.Api.Runtime

  public src: Framework.Api.Src

  public srcPath: Framework.Api.SrcPath

  public string: Framework.Api.Stringify

  public storage: Framework.Api.Storage

  public target: Framework.Api.Target

  public template: Framework.Api.Template

  public vendor: Framework.Api.Vendor

  /**
   * Base constructor.
   */
  public constructor(providers: Framework.Providers) {
    this.get = this.get.bind(this)
    this.use = this.use.bind(this)
    this.when = this.when.bind(this)
    this.pipe = this.pipe.bind(this)
    this.makeContainer = this.makeContainer.bind(this)
    this.callMeMaybe = this.callMeMaybe.bind(this)
    this.providers = this.makeContainer(providers)
  }

  protected get providers(): Framework.Container<
    Framework.Providers
  > {
    return this._providers
  }

  protected set providers(
    providers: Framework.Container<Framework.Providers>,
  ) {
    this._providers = providers
  }

  protected get api(): Framework.Container {
    return this._api
  }

  protected set api(api: Framework.Container) {
    this._api = api
  }

  protected get store(): Framework.Container<
    Framework.Container
  > {
    return this._store
  }

  protected set store(
    store: Framework.Container<Framework.Container>,
  ) {
    this._store = store
  }

  protected get services(): Framework.Container {
    return this._services
  }

  protected set services(services: Framework.Container) {
    this._services = services
  }

  public abstract init(): this

  public abstract register(): void

  public abstract boot(): void

  public abstract get(): this

  public abstract set<T = any>(prop: string, value: T): void

  public abstract callMeMaybe<I = unknown>(
    value: Framework.MaybeCallable<I>,
  ): I

  public abstract makeContainer(repository?: {
    [key: string]: any
  }): Framework.Container

  public abstract makeDisk(
    name: string,
    dir: string,
    glob?: string[],
  ): void

  public abstract pipe(fns: CallableFunction[]): this
}
