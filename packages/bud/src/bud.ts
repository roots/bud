import {BudInterface, Plugin} from './'
import Framework, {
  FrameworkInterface,
} from '@roots/bud-framework'
import api from './api'
import app from '@roots/bud-cli'
import args from './args'
import Compiler from '@roots/bud-compiler'
import config from './config'
import env from './env'
import features from './features'
import loaders, {loaderModules} from './loaders'
import mode from './mode'
import options from './options'
import paths from './paths'
import patterns from './patterns'
import {PluginController} from './Plugin'
import plugins from './plugins'
import rules from './rules'
import Server from '@roots/bud-server'

class Bud
  extends Framework
  implements BudInterface, FrameworkInterface {
  public name = '@roots/bud'

  public cli: BudInterface['cli']
  public compiler: BudInterface['compiler']
  public config: BudInterface['config']

  public args: BudInterface['args']
  public env: BudInterface['env']
  public features: BudInterface['features']
  public loaders: BudInterface['loaders']
  public loaderModules: BudInterface['loaderModules']
  public options: BudInterface['options']
  public paths: BudInterface['paths']
  public patterns: BudInterface['patterns']
  public rules: BudInterface['rules']
  public webpackPlugins: BudInterface['webpackPlugins']

  public fs: BudInterface['fs']
  public hooks: BudInterface['hooks']
  public mode: BudInterface['mode']
  public package?: BudInterface['package']
  public server: BudInterface['server']

  public addExtensions: BudInterface['addExtensions'] =
    api.addExtensions
  public alias: BudInterface['alias'] = api.alias
  public babel: BudInterface['babel'] = api.babel
  public brotli: BudInterface['brotli'] = api.brotli
  public bundle: BudInterface['bundle'] = api.bundle
  public compile: BudInterface['compile'] = api.compile
  public copy: BudInterface['copy'] = api.copy
  public copyAll: BudInterface['copyAll'] = api.copyAll
  public dev: BudInterface['dev'] = api.dev
  public devtool: BudInterface['devtool'] = api.devtool
  public dist: BudInterface['dist'] = api.dist
  public distPath: BudInterface['distPath'] = api.distPath
  public glob: BudInterface['glob'] = api.glob
  public gzip: BudInterface['gzip'] = api.gzip
  public hash: BudInterface['hash'] = api.hash
  public mini: BudInterface['mini'] = api.mini
  public postcss: BudInterface['postcss'] = api.postcss
  public project: BudInterface['project'] = api.project
  public projectPath: BudInterface['projectPath'] =
    api.projectPath
  public provide: BudInterface['provide'] = api.provide
  public publicPath: BudInterface['publicPath'] = api.publicPath
  public runtimeManifest: BudInterface['runtimeManifest'] =
    api.runtimeManifest
  public src: BudInterface['src'] = api.src
  public srcPath: BudInterface['srcPath'] = api.srcPath
  public target: BudInterface['target'] = api.target
  public terser: BudInterface['terser'] = api.terser
  public extend: BudInterface['extend'] = api.extend
  public vendor: BudInterface['vendor'] = api.vendor
  public when: BudInterface['when'] = api.when

  public constructor() {
    super()

    this.cli = app
    this.config = config

    this.compiler = new Compiler()
    this.server = new Server()

    this.args = this.makeContainer(args)
    this.env = this.makeContainer(env)
    this.features = this.makeContainer(features)
    this.loaderModules = this.makeContainer(loaderModules)
    this.options = this.makeContainer(options)
    this.paths = this.makeContainer(paths)
    this.patterns = this.makeContainer(patterns)
    this.rules = this.makeContainer(rules)
    this.webpackPlugins = this.makeContainer(plugins)

    this.hooks = this.makeHooks(this)
    this.mode = mode(this)
    this.fs = this.makeDisk(this.paths.get('project'))
  }

  public makeLoaders: BudInterface['makeLoaders'] = function (
    this: BudInterface,
  ): void {
    this.loaders = this.makeContainer(loaders(this))
  }

  public updateDisk: BudInterface['updateDisk'] = function (): void {
    /** !Glob */
    const noInclude = [
      `!${this.fs.path.resolve(
        this.paths.get('project'),
        'node_modules/**/*',
      )}`,

      `!${this.fs.path.resolve(
        this.paths.get('project'),
        'vendor/**/*',
      )}`,
    ]

    /** Glob */
    const yesInclude = [
      this.fs.path.resolve(this.paths.get('project'), '*'),
      this.fs.path.resolve(this.paths.get('project'), '**/*'),
    ]

    /** Set */
    this.fs = this.makeDisk(this.paths.get('project'), [
      ...yesInclude,
      ...noInclude,
    ])
  }

  public makePluginController(plugin: Plugin): PluginController {
    return new PluginController(this, plugin)
  }
}

export {Bud as default}
