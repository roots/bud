import Container from '@roots/container'
import Server from '@roots/bud-server'
import Compiler from '@roots/bud-compiler'

import Config from '@roots/bud-config'

import {Build} from './../Build'

import uses from '../Components/uses'
import rules from '../Components/rules'
import loaders from '../Components/loaders'
import plugins from '../Components/plugins'

import {Controller} from '../Extend/Controller'
import Hooks from '../Extend/Hooks'

import Store from '../Model'
import args from '../Model/args'
import webpack from '../Model/build'
import env from '../Model/env'
import features from '../Model/features'
import paths from '../Model/paths'
import patterns from '../Model/patterns'
import server from '../Model/server'

import format from './util/format'
import logger from './util/logger'
import pretty from './util/pretty'

import filesystemSetup from './bootstrap/filesystemSetup'
import parseArguments from './bootstrap/parseArguments'

import Webpack, {Logger} from 'webpack'
import FileSystem from '@roots/filesystem/lib/FileSystem'
import FileContainer from '@roots/filesystem/lib/FileContainer'

class Bud implements Bud.Interface {
  [key: string]: any

  public disks: FileSystem
  public fs: FileContainer

  public logger = logger
  public extensions: Controller
  public server?: Server.Interface
  public compiler?: Compiler

  public build: typeof Build

  public hooks: Bud.Hooks.Interface
  public on: Bud.Hooks.Interface['on']

  public mode: Bud.Mode
  public store: Store

  public util = {
    format,
    pretty,
  }

  public constructor() {
    this.hooks = Hooks(this.logger)
    this.on = this.hooks.on.bind(this.hooks)

    this.extension = new Controller(this)
    this.disks = new FileSystem()
    this.fs = new FileContainer()
    this.compiler = new Compiler()
    this.server = new Server()
    this.store = new Store({
      args,
      env,
      features,
      loaders,
      package: {},
      paths,
      patterns,
      plugins,
      uses: uses(this),
      rules: rules(this),
      server,
      webpack,
    })

    Object.entries(Config).map(
      ([name, fn]: [string, CallableFunction]) => {
        this[name] = fn.bind(this)
      },
    )

    this.build = Build.bind(this)

    this.mode = {
      is: check => this.store['webpack'].is('mode', check),
      get: () => this.store['webpack'].get('mode'),
      set: mode => {
        this.store['webpack'].set('mode', mode)
        return this
      },
    }

    // @roots vdisk
    this.makeDisk(
      '@roots',
      this.fs.path.resolve(__dirname, '../../'),
      ['**/*'],
    )

    // project vdisk
    this.fs = this.makeDisk(
      'project',
      this.store['paths'].get('project'),
      ['**/*'],
    )

    filesystemSetup.bind(this)()
    parseArguments.bind(this)()
  }

  public makeContainer(baseDir: string): FileContainer {
    return new FileContainer(baseDir ?? process.cwd())
  }

  public makeDisk(
    key?: string,
    baseDir?: string,
    glob?: string[],
  ): FileContainer {
    return this.disks.set(key ?? 'primary', {baseDir, glob})
  }

  public getDisk(key?: string): FileContainer {
    return this.disks.get(key ?? 'primary')
  }
}

declare namespace Bud {
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
      state?: Container.Repository,
    ) => Product.Module

    export type Resolve = (
      state?: Container.Repository,
    ) => Product.Resolve

    export type Optimization = (
      state?: Container.Repository,
    ) => Product.Optimization

    export type Plugins = (
      state?: Container.Repository,
    ) => {plugins: Product.Plugins}

    export type Output = (
      state?: Container.Repository,
    ) => Product.Output

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
  }
  export interface Interface {
    [key: string]: any
  }

  export namespace Hooks {
    export interface Interface {
      logger: Logger

      registered: Registry

      make: RegistryFactory

      entries: () => any

      on: Handler

      filter: Filter
    }

    export interface Constructor {
      (app: Bud): Interface
    }

    export interface Handler {
      (name: string, value: any): any
    }

    export type Filter = (name: string, call: Handler) => any

    export interface Registry {
      [key: string]: RegistryItem
    }

    export interface RegistryItem {
      hook: Filter
      fired: boolean
    }

    export type RegistryFactory = (hook: Filter) => RegistryItem
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
}

export default Bud
