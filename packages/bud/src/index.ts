import {framework} from '@roots/bud-framework'
import {compiler} from '@roots/bud-compiler'
import {api} from './api'
import {repositories} from './repositories'
import {config} from './config'
import express, {Express} from 'express'
import * as Api from './api/types'
import {
  Container,
  PluginContainer,
  FileContainer,
  PluginControllerInterface,
  Hooks,
  Util,
} from '@roots/bud-framework'
import {WebpackMode, WebpackConfig} from '@roots/bud-typings'
import {Paths, Features, Options} from './repositories/types'
export {Use} from './repositories/rulesets'

export declare type Bud = {
  /**
   * ## bud.args
   */
  args: Container

  /**
   * ## bud.compiler
   *
   * The compiler function which carries out the final build.
   */
  compiler: any

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
  features: Features

  /**
   * ## bud.args
   */
  flags: Container

  /**
   * ## bud.fs
   *
   * Filesystem utilities.
   */
  fs: Util['fs']

  /**
   * ## bud.hooks
   *
   * Hooks
   */
  hooks: Hooks

  /**
   * ## bud.inDevelopment
   *
   * Boolean returning true if in development.
   */
  inDevelopment: boolean

  /**
   * ## bud.inProduction
   *
   * Boolean returning true if in production.
   */
  inProduction: boolean

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
   * ## bud.mode
   *
   * Current build environment ('production', 'development', 'none')
   */
  mode: WebpackMode

  /**
   * ## bud.options
   *
   * Primary key value store of configuration options.
   */
  options: Options

  /**
   * ## bud.paths
   *
   * Project and framework paths.
   */
  paths: Paths

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
  distPath: Api.PathSetter

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
   * ## bud.map
   *
   * Enable or disable source-maps
   *
   * ```js
   * bud.map(true)
   */
  map: Api.SourceMap

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
  projectPath: Api.PathSetter

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
  publicPath: Api.PathSetter

  /**
   * ## bud.src
   *
   * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
   *
   * ```js
   * bud.src('scripts/app.js')
   * ```
   */
  src: Api.PathGetter

  /**
   * ## bud.srcPath
   *
   * Set the project's src directory.
   *
   *  ```js
   * bud.srcPath('src')
   * ```
   */
  srcPath: Api.PathSetter

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
   * ## bud.use
   *
   * Register a Bud extension.
   *
   * ```js
   * bud.use([require('@roots/bud-demo-plugin')])
   */
  use: Api.UsePlugin

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
   * bud.when(bud.inProduction, bud => {
   *  bud.mini()
   *  bud.vendor()
   *  // ...
   * })
   */
  when: Api.When
}

/**
 * Bind stores.
 */
repositories.stores.forEach(store => {
  framework.bind(store.name, store)
})

/**
 * Bind file stores.
 */
repositories.files.forEach(store => {
  framework.bindFiles(store.name, store)
})

/**
 * Bind stores.
 */
repositories.plugins.forEach(store => {
  framework.bindPlugins(store.name, store)
})

framework.apply('mode', framework.args.get('mode'))
framework.apply(
  'inProduction',
  framework.args.is('mode', 'production'),
)
framework.apply(
  'inDevelopment',
  framework.args.is('mode', 'development'),
)

framework.apply('hooks', framework.hooks(framework))
framework.apply('controller', framework.pluginController(framework))
framework.apply('fs', framework.util.fs)
framework.apply('format', framework.util.format)
framework.apply('config', config)
framework.apply('compiler', compiler)
framework.apply('server', express())
framework.server.set('title', 'Bud')

/** Bind the public API. */
Object.values(api).forEach((method: () => any) => {
  framework.apply(method.name, method)
})

const babel = framework.options.get('babel')
framework.options.set('babel', babel(framework.configs))

const postcss = framework.options.get('postcss')
framework.options.set('postcss', postcss(framework.flags))

/** Type achieved. */
const bud: Bud = framework

export {bud}
