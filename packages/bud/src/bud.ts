import Container, {Loose} from '@roots/container'
import Filesystem from '@roots/filesystem'
import Framework, {
  FrameworkInterface,
  Hooks,
} from '@roots/bud-framework'
import {app, Instance} from '@roots/bud-cli'

import {config, WebpackBuilder} from './config'

import args from './args'
import env from './env'
import features from './features'
import loaders, {loaderModules} from './loaders'
import mode, {Mode} from './mode'
import options from './options'
import paths from './paths'
import patterns from './patterns'
import plugins from './plugins'
import rules from './rules'

import addExtensions, {AddExtensions} from './api/addExtensions'
import alias, {Alias} from './api/alias'
import babel, {Babel} from './api/babel'
import brotli, {Brotli} from './api/brotli'
import bundle, {Bundle} from './api/bundle'
import compile, {Compile} from './api/compile'
import copy, {Copy} from './api/copy'
import copyAll, {CopyAll} from './api/copyAll'
import dev, {Dev} from './api/dev'
import devtool, {Devtool} from './api/devtool'
import dist, {Dist} from './api/dist'
import distPath, {DistPath} from './api/distPath'
import extend, {Extend} from './api/extend'
import hash, {Hash} from './api/hash'
import gzip, {Gzip} from './api/gzip'
import glob, {Glob} from './api/glob'
import runtimeManifest, {
  RuntimeManifest,
} from './api/runtimeManifest'
import mini, {Mini} from './api/mini'
import postcss, {PostCss} from './api/postcss'
import project, {Project} from './api/project'
import projectPath, {ProjectPath} from './api/projectPath'
import provide, {Provide} from './api/provide'
import publicPath, {PublicPath} from './api/publicPath'
import src, {Src} from './api/src'
import srcPath, {SrcPath} from './api/srcPath'
import target, {Target} from './api/target'
import terser, {Terser} from './api/terser'
import vendor, {Vendor} from './api/vendor'
import when, {When} from './api/when'

declare interface BudInterface extends FrameworkInterface {
  /**
   * ## bud.name
   *
   * Instance name
   */
  name: string

  /**
   * ## bud.cli
   *
   * Application CLI
   */
  cli: Instance

  /**
   * ## bud.makeCli
   *
   * Make an application CLI
   */
  makeCli: () => void

  /**
   * ## bud.args
   *
   * Arguments passed on invocation.
   */
  args: Container

  /**
   * ## bud.config
   *
   * Builds the webpack configuration object out of Bud state
   */
  config: WebpackBuilder

  /**
   * ## bud.env
   *
   * Project environment variables.
   */
  env: Container

  /**
   * ## bud.features
   *
   * Status of features
   */
  features: Container

  /**
   * ## bud.fs
   *
   * Filesystem utilities.
   */
  fs: Filesystem

  /**
   * ## bud.hooks
   *
   * Filters-based extension interface.
   */
  hooks: Hooks

  /**
   * ## bud.updateDisk
   */
  updateDisk: () => void

  /**
   * ## bud.loaderModules
   *
   * Webpack loader modules
   */
  loaderModules: Container

  /**
   * ## bud.loaders
   *
   * Webpack loaders
   */
  loaders: Container | Loose

  /**
   * ## bud.makeLoaders
   */
  makeLoaders: () => void

  /**
   * ## bud.options
   *
   * Primary key value store of configuration options.
   */
  options: Container

  /**
   * ## bud.paths
   *
   * Project and framework paths.
   */
  paths: Container

  /**
   * ## bud.patterns
   *
   * Regular expressions
   */
  patterns: Container

  /**
   * ## bud.plugins
   *
   * Bud framework plugins and webpack adapters.
   */
  webpackPlugins: Container

  /**
   * ## bud.rules
   *
   * Webpack module loader rules.
   */
  rules: Container

  /**
   * ## bud.addExtensions
   *
   * Add support for additional extensions.
   *
   * ```js
   * bud.addExtensions(['jsx', 'vue'])
   * ```
   */
  addExtensions: AddExtensions

  /**
   * ## bud.alias
   *
   * Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.
   *
   * Having defined this alias:
   *
   * ```js
   * bud.alias({'scripts': bud.src('scripts')})
   * ```
   *
   * You can now reference scripts against that alias in your import statements:
   *
   * ```js
   * import 'scripts/myScript' // replacing '../../myScript'
   * ```
   **/
  alias: Alias

  /**
   * ## bud.babel
   *
   * Configure Babel.
   *
   * If you prefer, you may utilize a `babel.config.js` file in the project root,
   * either alongside or in lieue of this configuration.
   *
   * Conflicts between supplied configs will be resolved in favor of the project config file.
   *
   * @see https://babeljs.io/docs/en/configuration
   */
  babel: Babel

  /**
   * ## bud.brotli
   *
   * Apply brotli compression to static assets.
   *
   * ```js
   * bud.brotli()
   * ```
   *
   * ```js
   * bud.brotli({
   *   compressionOptions: {
   *     level: 11,
   *   },
   *   threshold: 10240,
   *   minRatio: 0.8,
   *   deleteOriginalAssets: false,
   * })
   * ```
   */
  brotli: Brotli

  /**
   * ## bud.bundle
   *
   * Compile a group of assets.
   *
   * ```js
   * bud.bundle('app', [
   *   bud.src('app.js'),
   *   bud.src('app.css'),
   * ])
   * ```
   */
  bundle: Bundle

  /**
   * ## bud.compile
   *
   * Compile finalized webpack configuration and run build.
   *
   * ```
   * bud.compile()
   * ```
   */
  compile: Compile

  /**
   * ## bud.copy
   *
   * Copy a file.
   *
   * ```js
   * bud.copy(
   *   bud.src('images/image.png'),
   *   bud.dist('image.png'),
   * )
   * ```
   */
  copy: Copy

  /**
   * ## bud.copyAll
   *
   * Copy all files from a specified source to a specified destination.
   *
   * ```js
   * bud.copyAll(
   *  bud.src('images'),
   *  bud.dist('images')
   * )
   * ```
   */
  copyAll: CopyAll

  /**
   * ## bud.dev
   *
   * Configure Bud's built in development server.
   */
  dev: Dev

  /**
   * ## bud.devtool
   *
   * Specify a devtool
   */
  devtool: Devtool

  /**
   * ## bud.dist
   *
   * Yield an absolute path from a path relative to the dist dir.
   *
   * ```js
   * bud.dist('scripts/app.js')
   * ```
   */
  dist: Dist

  /**
   * ## bud.distPath
   *
   * Set the project's dist directory.
   *
   *  ```js
   * bud.distPath('dist')
   * ```
   */
  distPath: DistPath

  /**
   * ## bud.glob
   *
   * Compile assets into a particular directory.
   *
   * ```js
   * bud.bundlePath(
   *  bud.dist('scripts'),
   *  [bud.src('scripts')],
   * )
   * ```
   */
  glob: Glob

  /**
   * ## bud.gzip
   *
   * Apply gzip compression to static assets.
   *
   * ```js
   * bud.gzip()
   * ```
   *
   * ```js
   * bud.gzip({
   *  test: /\.js$|\.css$|\.html$/,
   *  minRatio: 0.8,
   * })
   * ```
   */
  gzip: Gzip

  /**
   * ## bud.hash
   *
   * Enable or disable filename hashing of built assets.
   *
   * ```js
   * bud.hash(true)
   * ```
   */
  hash: Hash

  /**
   * ## bud.mini
   *
   * Enable or disable minification
   *
   * ```js
   * bud.mini(true)
   * ```
   */
  mini: Mini

  /**
   * ## bud.mode
   *
   * Get, set and check the webpack build mode.
   *
   * ```js
   * bud.mode.get()
   * ```
   *
   * ```js
   * bud.mode.is('production')
   * ```
   *
   * ```js
   * bud.mode.set('production')
   * ```
   */
  mode: Mode

  /**
   * ## bud.postcss
   *
   * Configure PostCSS.
   *
   * If you prefer, you may utilize a postcss.config.js file in the project root,
   * either alongside or in lieue of this configuration.
   *
   * Conflicts between supplied configs will be resolved in favor of the project config file.
   *
   * ```js
   * bud.postCss({
   *   plugins: [
   *    require('astroturf'),
   *   ],
   * })
   * ```
   */
  postcss: PostCss

  /**
   * ## bud.project
   *
   * Yield an absolute path from a path relative to the `bud.projectPath`.
   *
   * ```js
   * bud.project('package.json') // absolute path to package.json
   * ```
   */
  project: Project

  /**
   * ## bud.projectPath
   *
   * Set the project base path.
   *
   * ```js
   * bud.projectPath(__dirname)
   * ```
   */
  projectPath: ProjectPath

  /**
   * ## bud.provide
   *
   * Define variable aliases
   *
   * ```js
   * bud.provide({jquery: ['$', 'window.jQuery']})
   * ```
   */
  provide: Provide

  /**
   * ## bud.publicPath
   *
   * Set the project public path.
   *
   * ### Example
   *
   * ```js
   * bud.publicPath('dist')
   * ```
   */
  publicPath: PublicPath

  /**
   * Inline common scripts.
   *
   * ```js
   * bud.runtimeManifest('runtime')
   * ```
   */
  runtimeManifest: RuntimeManifest

  /**
   * ## bud.src
   *
   * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
   *
   * ```js
   * bud.src('scripts/app.js')
   * ```
   */
  src: Src

  /**
   * ## bud.srcPath
   *
   * Set the project's src directory.
   *
   *  ```js
   * bud.srcPath('src')
   * ```
   */
  srcPath: SrcPath

  /**
   * ## bud.target
   *
   * Set the build target. Defaults to 'web'.
   *
   * ```js
   * bud.target('web')
   * ```
   */
  target: Target

  /**
   * ## bud.terser
   *
   * Optimize build with terser.
   *
   * ```js
   * bud.terser({
   *  parse: {
   *   ecma: 8,
   *  },
   *  compress: {
   *    ecma: 5,
   *    warnings: false,
   *    comparisons: false,
   *    inline: 2,
   *  },
   * })
   * ```
   */
  terser: Terser

  /**
   * ## bud.extend
   *
   * Register a Bud extension.
   *
   * ```js
   * bud.extend([require('@roots/bud-demo-plugin')])
   */
  extend: Extend

  /**
   * ## bud.vendor
   *
   * Enable bundling vendor modules separately from application code.
   *
   * ```js
   * bud.vendor()
   * ```
   */
  vendor: Vendor

  /**
   * ## bud.when
   *
   * Define build steps to be carried out under certain conditions
   *
   * ```js
   * bud.when(bud.mode.is('production'), bud => {
   *  bud.mini()
   *  bud.vendor()
   *  // ...
   * })
   */
  when: When
}

class Bud
  extends Framework
  implements BudInterface, FrameworkInterface {
  public name = '@roots/bud'
  public cli: BudInterface['cli']
  public config: BudInterface['config'] = config
  public fs: BudInterface['fs']
  public hooks: BudInterface['hooks']
  public mode: BudInterface['mode']

  /**
   * Containers
   */
  public args: BudInterface['args']
  public env: BudInterface['env']
  public features: BudInterface['features']
  public loaders: BudInterface['loaders']
  public loaderModules: BudInterface['loaderModules']
  public options: BudInterface['options']
  public paths: BudInterface['paths']
  public patterns: BudInterface['patterns']
  public webpackPlugins: BudInterface['webpackPlugins']
  public rules: BudInterface['rules']

  /**
   * Public configuration API
   */
  public addExtensions: BudInterface['addExtensions'] = addExtensions
  public alias: BudInterface['alias'] = alias
  public babel: BudInterface['babel'] = babel
  public brotli: BudInterface['brotli'] = brotli
  public bundle: BudInterface['bundle'] = bundle
  public compile: BudInterface['compile'] = compile
  public copy: BudInterface['copy'] = copy
  public copyAll: BudInterface['copyAll'] = copyAll
  public dev: BudInterface['dev'] = dev
  public devtool: BudInterface['devtool'] = devtool
  public dist: BudInterface['dist'] = dist
  public distPath: BudInterface['distPath'] = distPath
  public glob: BudInterface['glob'] = glob
  public gzip: BudInterface['gzip'] = gzip
  public hash: BudInterface['hash'] = hash
  public mini: BudInterface['mini'] = mini
  public postcss: BudInterface['postcss'] = postcss
  public project: BudInterface['project'] = project
  public projectPath: BudInterface['projectPath'] = projectPath
  public provide: BudInterface['provide'] = provide
  public publicPath: BudInterface['publicPath'] = publicPath
  public runtimeManifest: BudInterface['runtimeManifest'] = runtimeManifest
  public src: BudInterface['src'] = src
  public srcPath: BudInterface['srcPath'] = srcPath
  public target: BudInterface['target'] = target
  public terser: BudInterface['terser'] = terser
  public extend: BudInterface['extend'] = extend
  public vendor: BudInterface['vendor'] = vendor
  public when: BudInterface['when'] = when

  public constructor() {
    super()

    /**
     * Instantiate containers
     */
    this.args = this.makeContainer(args)
    this.env = this.makeContainer(env)
    this.features = this.makeContainer(features)
    this.loaderModules = this.makeContainer(loaderModules)
    this.options = this.makeContainer(options)
    this.paths = this.makeContainer(paths)
    this.patterns = this.makeContainer(patterns)
    this.rules = this.makeContainer(rules)
    this.webpackPlugins = this.makeContainer(plugins)

    /** Instantiate mode */
    this.mode = mode(this)

    /** Instantiate hooks */
    this.hooks = this.makeHooks(this)

    /** Instantiate filesystem */
    this.fs = this.makeDisk(this.paths.get('project'))

    this.makeCli = this.makeCli.bind(this)
  }

  public makeLoaders(this: BudInterface): void {
    this.loaders = this.makeContainer(loaders(this))
  }

  public updateDisk(): void {
    const notNodeModules = `!${this.fs.path.resolve(
      this.paths.get('project'),
      'node_modules/**/*',
    )}`

    const notVendor = `!${this.fs.path.resolve(
      this.paths.get('project'),
      'vendor/**/*',
    )}`

    this.fs = this.makeDisk(this.paths.get('project'), [
      this.fs.path.resolve(this.paths.get('project'), '*'),
      this.fs.path.resolve(this.paths.get('project'), '**/*'),
      notNodeModules,
      notVendor,
    ])
  }

  public makeCli(): void {
    this.cli = app({
      name: this.name,
      webpackConfig: this.options.get('webpack'),
      serverConfig: this.options.get('server'),
      terminate: this.terminate,
    })
  }
}

export {Bud as default, BudInterface}
export {Plugin} from './plugin'
