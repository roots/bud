import * as config from '@roots/bud-config'
import * as Bud from '@roots/bud-types'
import Framework from '@roots/bud-framework'
import Server from '@roots/bud-server'
import Compiler from '@roots/bud-compiler'
import build from '@roots/bud-build'
import {uses, loaders, rules} from '@roots/bud-rules'

import Store from '../Store'
import args from '../Store/args'
import env from '../Store/env'
import features from '../Store/features'
import webpack from '../Store/webpack'
import paths from '../Store/paths'
import patterns from '../Store/patterns'
import server from '../Store/server'
import plugins from '../Store/plugins/index'
import extensions from '../Store/extensions/index'
import Plugins from '../Extend/Plugins'

export default class extends Framework {
  public fs: Bud.Framework.FileContainer
  public plugins: Plugins

  public when: Bud.Config.When
  public dist: Bud.Config.Dist

  public config = config
  public build: Bud['build']
  public compiler?: Compiler
  public hooks: Bud.Hooks.Hooks
  public server?: Server
  public mode: Bud.Mode.Mode
  public store: Store

  public constructor() {
    super()

    this.store = new Store({
      args,
      env,
      extensions,
      features,
      loaders,
      package: {},
      paths,
      patterns,
      plugins,
      uses: uses(this),
      rules: rules(this),
      webpack,
      server,
    })

    this.compiler = new Compiler()
    this.server = new Server()

    Object.entries(this.config).map(
      ([name, fn]: [string, CallableFunction]) => {
        Object.defineProperty(this, name, {
          get: () => fn.bind(this),
        })
      },
    )

    this.plugins = new Plugins(
      this,
      this.store['plugins'].repository,
    )

    this.hooks = this.makeHooks(this)
    this.build = build.bind(this)

    this.mode = {
      is: check => this.store['webpack'].is('mode', check),
      get: () => this.store['webpack'].get('mode'),
      set: mode => {
        this.store['webpack'].set('mode', mode)
        return this
      },
    }

    // project vdisk
    this.fs = this.disks.set('project', {
      baseDir: this.store['paths'].get('project'),
      glob: ['**/*'],
    })

    // @roots vdisk
    this.disks.set('@roots', {
      baseDir: this.fs.path.resolve(__dirname, '../../'),
      glob: ['**/*'],
    })
  }
}
