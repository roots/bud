import {Framework} from '@roots/bud-typings'

export default abstract class {
  public name = '@roots/bud'

  public api: Framework.Index<any>

  public build: Framework.Build

  public cache: Framework.Cache

  public cli: Framework.CLI

  public compiler: Framework.Compiler

  public disk: Framework.Disk

  public env: Framework.Env

  public extensions: Framework.Extensions

  public hooks: Framework.Hooks

  public logger: Framework.Logger

  public options: Framework.Options

  public server: Framework.Server

  public store: Framework.Container

  public abstract get(): this

  public abstract access<I = any>(
    value: Framework.MaybeCallable<I>,
  ): I

  public abstract makeContainer(
    repository?: any,
  ): Framework.Container
}
