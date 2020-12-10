import {
  Env,
  Logger,
  Build,
  Cache,
  CLI,
  Compiler,
  Extensions,
  Hooks,
  MaybeCallable,
  Server,
} from '@roots/bud-typings'

import {Mode} from './Mode'
import {FileContainer, FileSystem} from '@roots/filesystem'
import {Container} from '@roots/container'

/**
 * Framework.
 */
export abstract class Framework {
  public abstract args: Container

  public abstract build: Build

  public abstract cache: Cache

  public abstract cli: CLI.Runner

  public abstract compiler: Compiler

  public abstract config: Container

  public abstract disk: FileSystem

  public abstract env: Env.Contract

  public abstract extensions: Extensions.Contract

  public abstract features: Container

  public abstract fs: FileContainer

  public abstract hooks: Hooks.Contract

  public abstract logger: Logger.Contract

  public abstract mode: Mode

  public abstract options: Container

  public abstract patterns: Container

  public abstract presets: Container

  public abstract api: Container

  public abstract components: Container

  public abstract services: Container

  public abstract server: Server.Contract

  public abstract callMeMaybe<I = unknown>(
    value: MaybeCallable<I>,
    ...args: unknown[]
  ): I

  public abstract makeContainer<T = unknown>(repository?: {
    [key: string]: T
  }): Container

  public abstract get(): this

  public abstract pipe(fns): this

  abstract init(): void

  protected abstract _disks(): void

  protected abstract _register(): void

  protected abstract _boot(): void
}
