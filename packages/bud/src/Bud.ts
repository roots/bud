import Framework from '@roots/bud-typings'
import {Bud as Core} from '@roots/bud-framework'

import {Compiler} from '@roots/bud-compiler'
import {Extensions} from '@roots/bud-extensions'
import {Server} from '@roots/bud-server'
import {Hooks} from '@roots/bud-hooks'
import {Build} from '@roots/bud-build'
import {Runner} from '@roots/bud-cli'
import {Cache} from '@roots/bud-cache'

import * as api from '@roots/bud-api'

declare interface AppInterface extends Core, Framework.Bud.App {
  args: Framework.Container

  config: Framework.Container

  features: Framework.Container

  patterns: Framework.Container

  build: Framework.Build.Contract

  cache: Framework.Cache.Contract

  cli: Framework.CLI.Runner

  compiler: Framework.Compiler.Contract

  env: Framework.Env.Contract

  extensions: Framework.Extensions.Contract

  hooks: Framework.Hooks.Contract

  server: Framework.Server.Contract

  addPlugin: typeof api.addPlugin

  alias: typeof api.alias

  brotli: typeof api.brotli

  buildCache: typeof api.buildCache

  copy: typeof api.copy

  define: typeof api.define

  dev: typeof api.dev

  devtool: typeof api.devtool

  dist: typeof api.dist

  distPath: typeof api.distPath

  entry: typeof api.entry

  externals: typeof api.externals

  glob: typeof api.glob

  gzip: typeof api.gzip

  hash: typeof api.hash

  library: typeof api.library

  minify: typeof api.minify

  project: typeof api.project

  projectPath: typeof api.projectPath

  provide: typeof api.provide

  publicPath: typeof api.publicPath

  run: typeof api.run

  runtime: typeof api.runtime

  src: typeof api.src

  srcPath: typeof api.srcPath

  target: typeof api.target

  template: typeof api.template

  terser: typeof api.terser

  use: typeof api.use

  vendor: typeof api.vendor

  when: typeof api.when

  disks: () => this

  register: () => this

  boot: () => this
}

export class Bud extends Core implements AppInterface {
  public config: Framework.Container

  public args: Framework.Container

  public features: Framework.Container

  public patterns: Framework.Container

  public cli: Framework.CLI.Runner

  public build: Framework.Build.Contract

  public cache: Framework.Cache.Contract

  public env: Framework.Env.Contract

  public hooks: Framework.Hooks.Contract

  public extensions: Framework.Extensions.Contract

  public compiler: Framework.Compiler.Contract

  public server: Framework.Server.Contract

  addPlugin: typeof api.addPlugin

  alias: typeof api.alias

  buildCache: typeof api.buildCache

  brotli: typeof api.brotli

  copy: typeof api.copy

  define: typeof api.define

  dev: typeof api.dev

  devtool: typeof api.devtool

  dist: typeof api.dist

  distPath: typeof api.distPath

  entry: typeof api.entry

  externals: typeof api.externals

  glob: typeof api.glob

  gzip: typeof api.gzip

  hash: typeof api.hash

  library: typeof api.library

  minify: typeof api.minify

  project: typeof api.project

  projectPath: typeof api.projectPath

  provide: typeof api.provide

  publicPath: typeof api.publicPath

  run: typeof api.run

  runtime: typeof api.runtime

  src: typeof api.src

  srcPath: typeof api.srcPath

  target: typeof api.target

  template: typeof api.template

  terser: typeof api.terser

  use: typeof api.use

  vendor: typeof api.vendor

  when: typeof api.when

  public constructor(registrable?: any) {
    super(registrable)

    this.build = new Build(this)

    this.cache = new Cache(this)

    this.hooks = new Hooks(this)

    this.cli = new Runner(this)

    this.compiler = new Compiler(this)

    this.server = new Server(this)

    this.extensions = new Extensions(this)
  }

  public disks: () => this = function () {
    this.fs.setBase(process.cwd())
    this.makeDisk('project', this.fs.base)
    this.makeDisk('@roots', '../..')

    return this
  }

  public register: () => this = function () {
    this.registry
      .getEntries('containers')
      .map(
        ([name, repo]: [string, Framework.Index<unknown>]) => {
          this[name] = this.makeContainer(repo)
        },
      )

    this.registry
      .getEntries('api')
      .map(([name, method]: [string, CallableFunction]) => {
        this[name] = method.bind(this)
      })

    return this
  }

  public boot: () => this = function () {
    this.registry
      .getEntries('loaders')
      .map((args: [string, Framework.Build.Loader]) => {
        this.build.setLoader(...args)
      })

    this.registry
      .getEntries('items')
      .map((args: [string, Framework.Item.Module]) => {
        this.build.setItem(...args)
      })

    this.registry
      .getEntries('rules')
      .map((args: [string, Framework.Rule.Module]) => {
        this.build.setRule(...args)
      })

    this.registry
      .getEntries('extensions')
      .map((args: [string, Framework.Extension.Contract]) => {
        this.extensions.set(...args)
      })

    return this
  }
}
