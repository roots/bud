import type Bud from '@roots/bud-types'
import Framework from '@roots/bud-framework'
import Server from '@roots/bud-server'
import Compiler from '@roots/bud-compiler'
import Build from '@roots/bud-build'
// import Config from '@roots/bud-config'
import {uses, loaders, rules} from '@roots/bud-rules'

import Store from '../Store'
import args from '../Store/args'
import env from '../Store/env'
import features from '../Store/features'
import webpack from '../Store/webpack'
import paths from '../Store/paths'
import patterns from '../Store/patterns'
import server from '../Store/server'

export default class extends Framework {
  public server: Server
  public args: Bud.Framework.Container
  public env: Bud.Framework.Container
  public features: Bud.Framework.Container
  public fs: Bud.Framework.FileContainer
  public hooks: Bud.Hooks.Hooks
  public loaders: Bud.Framework.Container
  public mode: Bud.Mode.Mode
  public options: Bud.Framework.Container
  public package?: Bud.Framework.Container
  public paths: Bud.Framework.Container
  public patterns: Bud.Framework.Container
  public plugins: Bud.Framework.Container
  public rules: Bud.Framework.Container
  public uses: Bud.Framework.Container

  // @todo typings
  // public config = Config
  public store: Store
  public compiler: Compiler
  public build: Build

  public constructor() {
    super()

    this.store = new Store()
    this.compiler = new Compiler()
    this.server = new Server()
    this.hooks = this.makeHooks(this)

    // containers
    this.store.create('args', args)
    this.store.create('env', env)
    this.store.create('features', features)

    this.store.create('paths', paths)
    this.store.create('patterns', patterns)
    this.store.create('loaders', loaders)
    this.store.create('rules', rules)
    this.store.create('uses', uses)
    this.store.create('webpack', webpack)
    this.store.create('server', server)

    this.build = Build.bind(this)

    this.mode = {
      is: check => this.store.use('webpack').is('mode', check),
      get: () => this.store.use('webpack').get('mode'),
      set: mode => {
        this.store.use('webpack').set('mode', mode)

        return this
      },
    }

    /**
     * Set API and map top level `this.{fn}` => `this.config.{fn}`
     * for convenient access
     */
    /* Object.entries(Config).map(
      ([name, fn]: [string, CallableFunction]) => {
        this.config[name] = fn.bind(this)

        Object.defineProperty(this, name, {
          get: this.config[name],
        })
      },
    ) */

    // project vdisk
    this.fs = this.disks.set('project', {
      baseDir: this.store.get('paths', 'project') as string,
      glob: ['**/*'],
    })

    // @roots vdisk
    this.disks.set('@roots', {
      baseDir: this.fs.path.resolve(__dirname, '../../'),
      glob: ['**/*'],
    })
  }
}
