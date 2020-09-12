import {Express} from '../externals/express'

import {
  WebpackMode,
  WebpackCompiler,
  WebpackConfig,
} from '../externals/webpack'

import {
  Container,
  PluginContainer,
  FileContainer,
  PluginControllerInterface,
  Hooks,
  Util,
} from '../framework'

import {Api} from './api'

export {
  Args,
  Configs,
  Environment,
  Features,
  Flags,
  Options,
  Directory,
  Paths,
} from './stores'

export interface Bud extends Container {
  /**
   * ## bud.args
   */
  args: Container

  /**
   * ## bud.compiler
   *
   * The compiler function which carries out the final build.
   */
  compiler: WebpackCompiler

  /**
   * ## bud.config
   *
   * The final webpack config object
   */
  config: (bud: Bud) => WebpackConfig

  /**
   * ## bud.configs
   *
   * Project configuration files.
   */
  configs: FileContainer

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
   * ## bud.args
   */
  flags: Container

  /**
   * ## bud.fs
   *
   * Filesystem utilities.
   */
  fs: any

  /**
   * ## bud.hooks
   *
   * Hooks
   */
  hooks: Hooks

  /**
   * ## bud.logger
   *
   * Debug logger
   */
  logger: any

  /**
   * ## bud.loaders
   *
   * Webpack loaders
   */
  loaders: Container

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
  plugins: PluginContainer

  /**
   * ## bud.rules
   *
   * Webpack module loader rules.
   */
  rules: Container

  /**
   * ## bud.server
   *
   * DEvelopment server.
   */
  server: Express

  /**
   * ## bud.util
   *
   * Helper functions.
   */
  util: Util

  /**
   * ## bud.rules
   *
   * Webpack module loader rule loaders.
   */
  uses: Container

  /**
   * ## bud.webpack
   *
   * Webpack configuration
   */
  webpack: Container

  /**
   * ## bud.addExtensions
   *
   * Add support for additional extensions.
   *
   * ```js
   * bud.addExtensions(['jsx', 'vue'])
   * ```
   */
  addExtensions: Api.AddExtensions

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
  alias: Api.Alias

  /**
   * ## bud.apply
   *
   * Extend the bud framework
   */
  apply: (string, any) => void

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
  babel: Api.Babel

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
  brotli: Api.Brotli

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
  bundle: Api.Bundle

  /**
   * ## bud.compile
   *
   * Compile finalized webpack configuration and run build.
   *
   * ```
   * bud.compile()
   * ```
   */
  compile: Api.Compile

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
  copy: Api.Copy

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
  copyAll: Api.Copy

  /**
   * ## bud.dev
   *
   * Configure Bud's built in development server.
   */
  dev: Api.Dev

  /**
   * ## bud.devtool
   *
   * Specify a devtool
   */
  devtool: Api.Devtool

  /**
   * ## bud.dist
   *
   * Yield an absolute path from a path relative to the dist dir.
   *
   * ```js
   * bud.dist('scripts/app.js')
   * ```
   */
  dist: Api.Dist

  /**
   * ## bud.distPath
   *
   * Set the project's dist directory.
   *
   *  ```js
   * bud.distPath('dist')
   * ```
   */
  distPath: Api.DistPath

  /**
   * ## bud.extension
   *
   * Extension controller
   */
  controller: PluginControllerInterface

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
  glob: Api.Glob

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
  gzip: Api.Gzip

  /**
   * ## bud.hash
   *
   * Enable or disable filename hashing of built assets.
   *
   * ```js
   * bud.hash(true)
   * ```
   */
  hash: Api.Hash

  /**
   * Inline common scripts.
   *
   * ```js
   * bud.runtimeManifest('runtime')
   * ```
   */
  runtimeManifest: Api.RuntimeManifest

  /**
   * ## bud.mini
   *
   * Enable or disable minification
   *
   * ```js
   * bud.mini(true)
   * ```
   */
  mini: Api.Mini

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
  mode: {
    is: (check: 'production' | 'development' | 'none') => boolean
    get: () => 'production' | 'development' | 'none'
    set: (check: 'production' | 'development' | 'none') => Bud
  }

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
  postcss: Api.PostCss

  /**
   * ## bud.project
   *
   * Yield an absolute path from a path relative to the `bud.projectPath`.
   *
   * ```js
   * bud.project('package.json') // absolute path to package.json
   * ```
   */
  project: Api.Project

  /**
   * ## bud.projectPath
   *
   * Set the project base path.
   *
   * ```js
   * bud.projectPath(__dirname)
   * ```
   */
  projectPath: Api.ProjectPath

  /**
   * ## bud.provide
   *
   * Define variable aliases
   *
   * ```js
   * bud.provide({jquery: ['$', 'window.jQuery']})
   * ```
   */
  provide: Api.Provide

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
  publicPath: Api.PublicPath

  /**
   * ## bud.src
   *
   * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
   *
   * ```js
   * bud.src('scripts/app.js')
   * ```
   */
  src: Api.Src

  /**
   * ## bud.srcPath
   *
   * Set the project's src directory.
   *
   *  ```js
   * bud.srcPath('src')
   * ```
   */
  srcPath: Api.SrcPath

  /**
   * ## bud.target
   *
   * Set the build target. Defaults to 'web'.
   *
   * ```js
   * bud.target('web')
   * ```
   */
  target: Api.Target

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
  terser: Api.Terser

  /**
   * ## bud.extend
   *
   * Register a Bud extension.
   *
   * ```js
   * bud.extend([require('@roots/bud-demo-plugin')])
   */
  extend: Api.Extend

  /**
   * ## bud.vendor
   *
   * Enable bundling vendor modules separately from application code.
   *
   * ```js
   * bud.vendor()
   * ```
   */
  vendor: Api.Vendor

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
  when: Api.When
}
