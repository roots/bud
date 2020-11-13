import {Bud} from '@roots/bud-framework'
import type {Indexed, Env} from '@roots/bud-typings'
import type {Configuration} from 'webpack'

import {FileContainer, FileSystem} from '@roots/filesystem'
import {Server} from '@roots/bud-server'

import {Args} from './containers/args'
import {Features} from './containers/features'
import {Patterns} from './containers/patterns'

import {api} from '@roots/bud-api'
import * as containers from './containers'
import * as extensions from './extensions'
import * as items from './items'
import * as loaders from './loaders'
import * as rules from './rules'
import * as services from './services'

import * as onRegister from './register'
import * as onBoot from './boot'

const bud: Bud = new Bud({
  containers,
  services: {
    fs: services.fs,
    disk: services.disk,
    build: services.build,
    hooks: services.hooks,
    compiler: services.compiler,
    server: services.server,
    cache: services.cache,
    extensions: services.extensions,
    cli: services.cli,
  },
  loaders: {
    [`css-loader`]: loaders.css,
    [`file-loader`]: loaders.file,
    [`mini-css-loader`]: loaders.minicss,
    [`raw-loader`]: loaders.raw,
    [`resolve-url-loader`]: loaders.resolve,
    [`style-loader`]: loaders.style,
    [`url-loader`]: loaders.url,
    [`cache-loader`]: loaders.cache,
    [`thread-loader`]: loaders.thread,
  },
  items: {
    ['cache']: items.cache,
    ['css']: items.css,
    ['file']: items.file,
    ['mini-css']: items.minicss,
    ['raw']: items.raw,
    ['resolve-url']: items.resolve,
    ['style']: items.style,
    ['svg']: items.svg,
    ['thread']: items.thread,
  },
  rules: {
    css: rules.css,
    font: rules.font,
    html: rules.html,
    image: rules.image,
    js: rules.js,
    svg: rules.svg,
  },
  extensions: {
    [`clean-webpack-plugin`]: extensions.cleanWebpack,
    [`compression-webpack-plugin-gzip`]: extensions.gzip,
    [`compression-webpack-plugin-brotli`]: extensions.brotli,
    [`ignore-emit-webpack-plugin`]: extensions.ignoreEmit,
    [`webpack-config-dump-plugin`]: extensions.configDump,
    [`copy-webpack-plugin`]: extensions.copy,
    [`webpack-define-plugin`]: extensions.define,
    [`webpack-hot-module-replacement-plugin]`]: extensions.hotModuleReplacement,
    [`html-webpack-plugin`]: extensions.html,
    [`html-hard-disk-plugin`]: extensions.htmlHardDisk,
    [`interpolate-html`]: extensions.interpolateHtml,
    [`webpack-manifest-plugin`]: extensions.manifest,
    [`mini-css-extract-plugin`]: extensions.miniCssExtract,
    [`webpack-provide-plugin`]: extensions.provide,
    [`terser-webpack-plugin`]: extensions.terser,
    [`watch-missing-modules`]: extensions.watchMissingModules,
    [`write-file-webpack-plugin`]: extensions.writeFile,
  },
  api: {
    addPlugin: api.addPlugin,
    alias: api.alias,
    brotli: api.brotli,
    buildCache: api.buildCache,
    copy: api.copy,
    define: api.define,
    dev: api.dev,
    devtool: api.devtool,
    dist: api.dist,
    distPath: api.distPath,
    entry: api.entry,
    externals: api.externals,
    hash: api.hash,
    gzip: api.gzip,
    glob: api.glob,
    library: api.library,
    minify: api.minify,
    project: api.project,
    projectPath: api.projectPath,
    provide: api.provide,
    publicPath: api.publicPath,
    run: api.run,
    runtime: api.runtime,
    src: api.src,
    srcPath: api.srcPath,
    template: api.template,
    use: api.use,
    target: api.target,
    terser: api.terser,
    vendor: api.vendor,
    when: api.when,
  },
})
  .register(onRegister)
  .boot(onBoot)

const {
  args,
  fs: {
    path: {resolve},
  },
} = bud

bud
  .when(
    args.has('project'),
    bud =>
      bud.projectPath(
        resolve(bud.fs.getBase(), args.get('project')),
      ),
    bud => bud.projectPath(process.cwd()),
  )

  .srcPath(args.get('src') ?? 'src')
  .distPath(args.get('dist') ?? 'dist')

  .when(
    args.has('mode'),
    ({mode}: Bud) => mode.set(args.get('mode')),
    ({mode}: Bud) => mode.set('none'),
  )

  .when(args.has('html'), ({template}) => template())
  .when(args.has('minify'), ({minify}) => minify())
  .when(args.has('gzip'), ({gzip}) => gzip())
  .when(args.has('brotli'), ({brotli}) => brotli())
  .when(args.has('runtime'), ({runtime}) => runtime())
  .when(args.has('vendor'), ({vendor}) => vendor())
  .when(args.has('hash'), ({hash}) => hash())
  .when(args.has('devtool'), ({devtool}) =>
    devtool(args.get('devtool') ?? '#@cheap-eval-source-map'),
  )

declare interface App extends Bud {
  args: Args
  config: Indexed<Configuration>
  env: Env.Contract
  features: Features
  patterns: Patterns

  disks: FileSystem
  fs: FileContainer
  server: Server.Contract

  addPlugin: typeof api.addPlugin
  alias: typeof api.alias
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
}

/**
 * Framework.Bud
 * @type {Bud}
 */
export default bud

/**
 * Bud
 * @type {Bud}
 */
module.exports = bud
