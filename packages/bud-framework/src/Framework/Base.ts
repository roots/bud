import {Framework} from '@roots/bud-typings'

export default abstract class {
  public name = '@roots/bud'

  public build: Framework.Build

  public cache: Framework.Cache

  public cli: Framework.CLI

  public compiler: Framework.Compiler

  public disk: Framework.Disk

  public env: Framework.Env

  public extensions: Framework.Extensions

  public hooks: Framework.Hooks

  public logger: Framework.Logger

  public mode: Framework.Mode

  public server: Framework.Server

  public store: Framework.Store

  public use: Framework.Use

  public when: Framework.When

  public addPlugin: Framework.Api.AddPlugin<this>

  public alias: Framework.Api.Alias<this>

  public copy: Framework.Api.Copy<this>

  public define: Framework.Api.Define<this>

  public dev: Framework.Api.Dev<this>

  public devtool: Framework.Api.Devtool<this>

  public dist: Framework.Api.Dist<this>

  public distPath: Framework.Api.DistPath<this>

  public entry: Framework.Api.Entry<this>

  public externals: Framework.Api.Externals<this>

  public glob: Framework.Api.Glob<this>

  public gzip: Framework.Api.Gzip<this>

  public hash: Framework.Api.Hash<this>

  public minify: Framework.Api.Minify<this>

  public project: Framework.Api.Project<this>

  public projectPath: Framework.Api.ProjectPath<this>

  public provide: Framework.Api.Provide<this>

  public proxy: Framework.Api.Proxy<this>

  public publicPath: Framework.Api.PublicPath<this>

  public run: Framework.Api.Run<this>

  public runtime: Framework.Api.Runtime<this>

  public src: Framework.Api.Src<this>

  public srcPath: Framework.Api.SrcPath<this>

  public string: Framework.Api.Stringify<this>

  public target: Framework.Api.Target<this>

  public template: Framework.Api.Template<this>

  public vendor: Framework.Api.Vendor<this>

  public abstract get(): this

  public abstract access<I = unknown>(
    value: Framework.MaybeCallable<I>,
  ): I

  public abstract makeContainer<T>(
    repository?: Framework.Container<T>['repository'],
  ): Framework.Container<T>

  public abstract pipe(fns: CallableFunction[]): this
}
