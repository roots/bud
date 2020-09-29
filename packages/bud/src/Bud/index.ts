import Bud from '@roots/bud-types'
import Server from '@roots/bud-server'
import Compiler from '@roots/bud-compiler'
import Build from '@roots/bud-build'
import Config from '@roots/bud-config'
import {uses, modules, rules} from '@roots/bud-rules'

import args from './args'
import env from './env'
import features from './features'
import mode from './mode'
import paths from './paths'
import patterns from './patterns'
import Webpack from '../Webpack'

export default class extends Bud {
  public api: unknown // a set of fns
  public webpack: Webpack

  public constructor() {
    super()

    this.compiler = new Compiler()
    this.server = new Server()
    this.hooks = this.makeHooks(this)

    // containers
    this.args = this.makeContainer(args)
    this.env = this.makeContainer(env)
    this.features = this.makeContainer(features)

    this.paths = this.makeContainer(paths)
    this.patterns = this.makeContainer(patterns)
    this.loaders = this.makeContainer(modules)
    this.rules = this.makeContainer(rules)
    this.uses = this.makeContainer(uses)

    this.webpack = new Webpack(this)

    this.mode = mode(this)
    this.build = Build.bind(this)

    /**
     * Set API and map top level `this.{fn}` => `this.config.{fn}`
     * for convenient access
     */
    Object.entries(Config).map(
      ([name, fn]: [string, CallableFunction]) => {
        this.api[name] = fn.bind(this)

        Object.defineProperty(this, name, {
          get: this.api[name],
        })
      },
    )

    // project vdisk
    this.fs = this.disks.set('project', {
      baseDir: this.paths.get('project'),
      glob: ['**/*'],
    })

    // @roots vdisk
    this.disks.set('@roots', {
      baseDir: this.fs.path.resolve(__dirname, '../../'),
      glob: ['**/*'],
    })
  }
}
