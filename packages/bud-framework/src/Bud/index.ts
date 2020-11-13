import type {Env, Hooks, Index} from '@roots/bud-typings'
import {Indexed as Container} from '@roots/container'
import {FileContainer, FileSystem} from '@roots/filesystem'
import {Mode} from './Mode'
import * as util from './util'

export {Bud, Bud as default}

class Bud implements Bud.Contract {
  [key: string]: any

  public registered: Container<any>

  public disk: FileSystem

  public fs: FileContainer

  public env: Env.Contract

  public hooks: Hooks.Contract

  public mode: Bud.Contract['mode']

  public logger: Bud.Logger.Contract = util.logger

  public constructor(registrables: Bud.ConstructorParameters) {
    this.makeContainer = this.makeContainer.bind(this)
    this.registered = this.makeContainer()

    Object.entries(registrables).forEach(
      ([name, registrable]) => {
        this.registered.set(name, registrable)
      },
    )

    this.register = this.register.bind(this)
    this.boot = this.boot.bind(this)
  }

  public register(registerFn: {
    [key: string]: CallableFunction
  }): this {
    Object.entries(registerFn).map(([, fn]) => {
      fn.bind(this)()
    })

    this.mode = new Mode(this)

    this.disk.set('project', {
      baseDir: process.cwd(),
      glob: ['**/*'],
    })
    this.disk.set('@roots', {
      baseDir: this.fs.path.resolve(__dirname, '../../../'),
      glob: ['**/*'],
    })
    this.fs.setBase(process.cwd())

    return this
  }

  public boot(bootFn: {[key: string]: CallableFunction}): this {
    Object.entries(bootFn).map(([, fn]) => {
      fn.bind(this)()
    })

    return this
  }

  public makeContainer: Bud.Contract['makeContainer'] = function <
    T = any
  >(repository) {
    return new Container<T>(repository)
  }
}

namespace Bud {
  /**
   * Core unit of the Bud application.
   */
  export declare class Contract {
    /**
     * @note I'm not sure how to type something this flexible.
     */
    [key: string]: any

    /**
     * Services registered to the framework.
     */
    public registered: Container<Service>

    /**
     * Register
     */
    public register: (fns: {
      [key: string]: CallableFunction
    }) => this

    /**
     * Boot
     */
    public boot(bootFn: {[key: string]: CallableFunction}): this

    /**
     * Disks.
     */
    public disk: FileSystem

    /**
     * Project files.
     */
    public fs: FileContainer

    /**
     * Env variables.
     */
    public env: Env.Contract

    /**
     * Hooks system.
     */
    public hooks: Hooks.Contract

    /**
     * Logger
     */
    public logger: Logger.Contract

    /**
     * Simple container interface for querying and
     * modifying Webpack mode.
     */
    public mode: Mode.Contract

    /**
     * Construct
     */
    public constructor(options: ConstructorParameters)

    /**
     * Make a new container.
     */
    public makeContainer<T>(
      repository?: Container.Repository<T>,
    ): Container
  }

  export type Format = (obj: unknown, options?) => string

  export type BuilderDefinition<T = any> = [
    Index<T>,
    BuilderDefinition.Initializer<T>,
  ]

  export namespace BuilderDefinition {
    export interface Args<Type> {
      this: Bud
      definition: [string, Type]
    }

    export type Initializer<Type> = (
      this: Bud,
      [name, object]: [string, Type],
    ) => void
  }

  export declare type When = (
    this: Bud,
    test: boolean,
    isTrue: (bud: Bud) => unknown,
    isFalse?: (bud: Bud) => unknown,
  ) => Bud

  export declare type Bootstrap = (
    initFn: (this: Bud.Contract) => void,
  ) => Bud.Contract

  export declare interface ConstructorParameters {
    [key: string]: any
  }

  export type DiskDefinition = {
    [key: string]: {glob: string[]; baseDir: string}
  }

  export type Service<T = unknown> = T

  /**
   * Environment variables utility.
   */
  export namespace Logger {
    export interface LogFn {
      // eslint-disable-next-line @typescript-eslint/ban-types
      <T extends object>(
        obj: T,
        msg?: string,
        ...args: any[]
      ): void
      (msg: string, ...args: any[]): void
    }

    export interface Contract {
      /**
       * Log at `'fatal'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
       * If more args follows `msg`, these will be used to format `msg` using `util.format`.
       *
       * @typeParam T: the interface of the object being serialized. Default is object.
       * @param obj: object to be serialized
       * @param msg: the log message to write
       * @param ...args: format string values when `msg` is a format string
       */
      fatal: LogFn

      /**
       * Log at `'error'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
       * If more args follows `msg`, these will be used to format `msg` using `util.format`.
       *
       * @typeParam T: the interface of the object being serialized. Default is object.
       * @param obj: object to be serialized
       * @param msg: the log message to write
       * @param ...args: format string values when `msg` is a format string
       */
      error: LogFn

      /**
       * Log at `'warn'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
       * If more args follows `msg`, these will be used to format `msg` using `util.format`.
       *
       * @typeParam T: the interface of the object being serialized. Default is object.
       * @param obj: object to be serialized
       * @param msg: the log message to write
       * @param ...args: format string values when `msg` is a format string
       */
      warn: LogFn

      /**
       * Log at `'info'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
       * If more args follows `msg`, these will be used to format `msg` using `util.format`.
       *
       * @typeParam T: the interface of the object being serialized. Default is object.
       * @param obj: object to be serialized
       * @param msg: the log message to write
       * @param ...args: format string values when `msg` is a format string
       */
      info: LogFn
    }
  }
}
