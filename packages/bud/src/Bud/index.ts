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

import {options} from '../options'
import Controller from '../Plugin'
import plugins from '../plugins/index'

export default class extends Bud {
  public constructor() {
    super()

    this.build = Build

    this.compiler = new Compiler()
    this.server = new Server()
    this.hooks = this.makeHooks(this)

    this.args = this.makeContainer(args)
    this.env = this.makeContainer(env)
    this.features = this.makeContainer(features)
    this.options = this.makeContainer(options)
    this.paths = this.makeContainer(paths)
    this.patterns = this.makeContainer(patterns)
    this.plugins = this.makeContainer(plugins)
    this.loaders = this.makeContainer(modules)
    this.rules = this.makeContainer(rules)
    this.uses = this.makeContainer(uses)

    this.mode = mode(this)

    /**
     * Produce the config API and bind scope.
     */
    Object.entries(Config).forEach(
      ([name, fn]: [string, CallableFunction]) => {
        this[name] = fn
        this[name] = this[name].bind(this)
      },
    )

    /** Project disk (default)*/
    this.fs = this.disks.set('project', {
      baseDir: this.paths.get('project'),
      glob: ['**/*'],
    })

    /** framework disk */
    this.disks.set('@roots', {
      baseDir: this.fs.path.resolve(__dirname, '../../'),
      glob: ['**/*'],
    })
  }

  /**
   * @todo updateDisk / file watcher solution
   */
  public updateDisk: Bud['updateDisk'] = function (): void {
    this.fs = this.disks.set('project', {
      baseDir: this.paths.get('project'),
      glob: ['**/*'],
    })
  }

  public makePluginController: Bud['makePluginController'] = function (
    plugin: Bud.Plugin.Factory,
  ) {
    return new Controller(this, plugin)
  }
}
