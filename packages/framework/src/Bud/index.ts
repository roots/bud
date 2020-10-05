import Webpack from 'webpack'
import * as pino from 'pino'

import Container from '@roots/container'
import Server from '@roots/bud-server'
import {FileSystem, FileContainer} from '@roots/filesystem'
import Compiler from '@roots/bud-compiler'
import Config from '@roots/bud-config'

import Build from '../Build'
import Components from '../Components'
import {Controller} from '../Extend/Controller'
import Hooks from '../Extend/Hooks'
import Model from '../Model'
import Store from '../Store'

import env from './env'
import format from './util/format'
import logger from './util/logger'
import pretty from './util/pretty'
import filesystemSetup from './bootstrap/filesystemSetup'
import parseArguments from './bootstrap/parseArguments'

class Bud {
  [key: string]: any
  private static PRIMARY_DISK = 'project'

  public build: Bud.Build
  public compiler: Compiler
  public components: Bud.Store
  public disks: FileSystem
  public env: Bud.Env
  public extensions: Controller
  public fs: FileContainer
  public hooks: Bud.Hooks
  public server: Server.Interface
  public logger: Bud.Hooks['logger'] = logger
  public on: Bud.Hooks['on']
  public store: Bud.Store
  public util = {
    format,
    pretty,
  }

  public constructor() {
    this.hooks = Hooks(this.logger)
    this.on = this.hooks.on.bind(this.hooks)

    this.components = new Store()
    this.store = new Store()
    this.extensions = new Controller(this)
    this.disks = new FileSystem()
    this.fs = new FileContainer()
    this.compiler = new Compiler()
    this.server = new Server()

    this.init()
  }

  private init() {
    // Binds bud.build -- produces final webpack configuration
    this.build = Build.bind(this)

    // State
    Object.entries(Model).map(([name, model]) => {
      return this.store.create(name, model)
    })

    this.mode = {
      is: check => this.store['build'].is('mode', check),
      get: () => this.store['build'].get('mode'),
      set: mode => {
        this.store['build'].set('mode', mode)
        return this
      },
    }

    // Binds bud.env -- Utility for getting and checking enviornment variables.
    this.env = env.bind(this)()

    // Binds API
    Object.entries(Config).map(
      ([name, fn]: [string, CallableFunction]) => {
        this[name] = fn.bind(this)
      },
    )

    // Manufactures interfaces used by bud.build
    Object.entries(Components(this)).map(([name, component]) => {
      return this.components.create(name, component)
    })

    // Various setup tasks
    filesystemSetup.bind(this)()
    parseArguments.bind(this)()
  }

  public makeDisk(
    key: string = Bud.PRIMARY_DISK,
    baseDir?: string,
    glob?: string[],
  ): FileContainer {
    return this.disks.set(key, {
      baseDir,
      glob,
    })
  }

  public useDisk(key: string = Bud.PRIMARY_DISK): FileContainer {
    return this.disks.get(key)
  }

  public makeContainer(baseDir: string): FileContainer {
    return new FileContainer(baseDir ?? process.cwd())
  }
}

declare namespace Bud {
  export interface Index<T> {
    [key: string]: T
  }

  export type Build = () => Build.Configuration

  export namespace Build {
    export type Configuration = Webpack.Configuration

    export type Input = any

    export namespace Product {
      export type Entry = Webpack.Entry | Webpack.EntryFunc
      export type Externals = Webpack.ExternalsObjectElement
      export type Module = Webpack.Module
      export type Resolve = Webpack.Resolve
      export type Optimization = Webpack.Options.Optimization
      export type Output = Webpack.Output
      export type Plugins = Webpack.Plugin[]
      export type General = Omit<
        Configuration,
        | 'entry'
        | 'externals'
        | 'module'
        | 'resolve'
        | 'optimization'
        | 'plugins'
        | 'output'
        | 'string'
      >
    }

    export type Entry = (
      state?: Container.Repository,
    ) => Product.Entry

    export type Externals = (
      state?: Container.Repository,
    ) => Product.Externals

    export type Module = (
      build?: Container.Repository,
    ) => Webpack.Module

    export type Rules = (
      build?: Container.Repository,
    ) => Product.Module['rules']

    export type Resolve = (
      state?: Container.Repository,
    ) => Bud.Index<Product.Resolve>

    export type Optimization = (
      state?: Container.Repository,
    ) => Product.Optimization

    export type Plugins = (
      state?: Container.Repository,
    ) => Bud.Index<Product.Plugins>

    export type Output = (
      state?: Container.Repository,
    ) => Bud.Index<Product.Output>

    export type General = (
      state?: Container.Repository,
    ) => Product.General

    export type Builders =
      | Build.Entry
      | Build.Externals
      | Build.Module
      | Build.Resolve
      | Build.Optimization
      | Build.Plugins
      | Build.Output
      | Build.General

    export interface Index {
      [key: string]: Builders
    }

    class Use implements Use.Interface {
      bud: Bud

      ident?: Use.Property

      loader?: Use.Property

      options?: Use.Property

      query?: Use.Property

      constructor(bud: Bud, rule: Use.Module)

      public set(rule): void

      public get(): Use.Module

      public make(): Use.Product
    }

    export namespace Use {
      export interface Interface {
        bud: Bud

        ident?: Use.Property

        loader?: Use.Property

        options?: Use.Property

        query?: Use.Property

        /**
         * Get the loader definition
         */
        get: () => Use.Module

        /**
         * Set the loader definition
         */
        set: (loader: Use.Module) => void

        /**
         * Use conforming to Webpack API.
         */
        make: () => Use.Product
      }

      export type Product = Webpack.RuleSetLoader

      export type Literal =
        | string
        | Webpack.RuleSetQuery
        | undefined

      export type Module = {
        [key: string]: Factory | Literal
      }

      export interface Factory {
        (this: any): Literal
      }

      export type Property = Literal | Factory

      export type RepositoryFactory = (
        bud: unknown,
      ) => {[key: string]: Use}
    }

    class Rule {
      public bud: Bud

      public enforce?: Rule.Enforce

      public exclude?: Rule.Conditional

      public include?: Rule.Conditional

      public issuer?: Rule.Conditional

      public oneOf?: Rule.OneOf

      public options?: Rule.Query

      /**
       * Options for parsing
       */
      public parser?: Rule.Parser

      /**
       * Options for the resolver
       */
      public resolve?: Rule.Resolve

      /**
       * Flags a module as with or without side effects
       */
      public sideEffects?: Rule.Bool

      /**
       * Shortcut for use.query
       */
      public query?: Rule.Query

      /**
       * Module type to use for the module
       */
      public type?: Rule.Type

      /**
       * Match the resource path of the module
       */
      public resource?: Rule.Conditional

      /**
       * Match the resource query of the module
       */
      public resourceQuery?: Rule.Conditional
      public compiler?: Rule.Conditional
      public rules?: Rule.OneOf
      public test?: Rule.Conditional
      public use?: Rule.Loader

      constructor(bud: Bud, rule: Rule.Generic)

      public get(): Rule.Product

      public make(): Rule.Product
    }

    export namespace Rule {
      /**
       * The most generic representation of a rule module.
       * Used for typecheck on constructor, get.
       */
      export type Generic =
        | Property<Products>
        | Property<Products>[]

      /**
       * Rule modules produce Webpack.RuleSetRule entries
       */
      export type Makes = Webpack.RuleSetRule

      /**
       * Rule modules can also be manipulated as keyed items.
       */
      export interface Property<Product> {
        [key: string]: Yield<Product>
      }

      /**
       * Rule properties can be defined as callable functions or as literal values.
       */
      export type Yield<Product> = Factory<Product> | Product

      /**
       * Rule property defined with a callable.
       */
      export interface Factory<Product> {
        (this: Bud): Product
      }

      /**
       * Rule modules produce Webpack.RuleSetRule entries
       */
      export type Product = Webpack.RuleSetRule

      /**
       * All possible final products
       */
      export type Products =
        | Webpack.RuleSetUse
        | Type
        | Enforce
        | Bool
        | Conditional
        | Parser
        | Query
        | Resolve
        | Loader
        | OneOf
        | Webpack.RuleSetLoader
        | Webpack.RuleSetLoader[]
        | Webpack.RuleSetUse
        | string

      /**
       * Product: String literal
       */
      export type String = string

      /**
       * Product: Module type to use
       */
      export type Type = Webpack.RuleSetRule['type']

      /**
       * Product: Enforce this rule as pre or post step
       */
      export type Enforce = Webpack.RuleSetRule['enforce']

      /**
       * Product: Boolean literal
       */
      export type Bool = boolean

      /**
       * Product: Boolean test
       */
      export type Conditional = Webpack.RuleSetCondition

      /**
       * Product: Options for parsing
       */
      export type Parser = Webpack.RuleSetRule['parser']

      /**
       * Product: Use query
       */
      export type Query = string | Parser

      /**
       * Product: webpack resolve (multi-compiler)
       */
      export type Resolve = Webpack.Resolve

      /**
       * Product: loader(s)
       */
      export type Loader =
        | Webpack.RuleSetLoader
        | Webpack.RuleSetLoader[]
        | Webpack.RuleSetUse

      /**
       * Product: Multiple child rules.
       */
      export type OneOf = Webpack.RuleSetRule[]
    }
  }

  export interface Hooks {
    logger: pino.BaseLogger

    registered: Hooks.Registry

    make: Hooks.RegistryFactory

    entries: () => any

    on: Hooks.Handler

    filter: Hooks.Handler
  }

  export namespace Hooks {
    export interface Constructor {
      (app: Bud): Hooks
    }

    export interface Handler {
      (name: string, value: unknown): unknown
    }

    export interface Registry {
      [key: string]: RegistryItem
    }

    export interface RegistryItem {
      hook: Handler
      fired: boolean
    }

    export type RegistryFactory = (hook: Handler) => RegistryItem
  }

  export type Modes = Webpack.Configuration['mode']

  export type Mode = {
    /**
     * Check the currently set mode.
     */
    is: (check: Modes) => boolean

    /**
     * Get the currently set mode
     */
    get: () => Modes

    /**
     * Set the mode.
     */
    set: (check: Modes) => Bud
  }

  /**
   * Environment utility.
   */
  export type Env = {
    /**
     * Check the value of an env
     */
    is: (check: Env) => boolean

    /**
     * Get the env
     */
    get: () => Env
  }

  /**
   * Application stores.
   */
  class Store {
    /**
     * App state. Each top level key is a container.
     */
    state: Container

    /**
     * Create a new store.
     */
    create: Store.Create
    /**
     * Use a store.
     */
    query: Store.Query

    /**
     * Merge new state into a store.
     */
    merge: Store.Merge

    /**
     * Get the state from an array of store keys
     */
    use: Store.Use

    /**
     * Fetch something from a store
     */
    get: Store.Get

    /**
     * Set something to the store
     */
    set: Store.Set
  }

  export namespace Store {
    /**
     * Store objects keyed by string.
     *
     * @note Objects will be containerized in the
     * do not call new Container() before passing.
     *
     * @todo make this okay.
     */
    export interface Constructor {
      [key: string]: {
        [key: string]: any
      }
    }

    /**
     * ## Application state container.
     */
    export type State = {
      [key: string]: Container
    }

    export type Use = (name: string) => Container

    export type Get = (
      name: string,
      query: string | string[],
    ) => Container[]

    export type Set = (
      name: string,
      query: string | string[],
      val: unknown,
    ) => Container[]

    export type Query = (name: string[]) => Container[]

    export type Create = (
      name: string,
      repo: Container['repository'],
    ) => void

    export type Merge = (
      name: string,
      repo: Container['repository'],
    ) => void
  }
}

export default Bud
