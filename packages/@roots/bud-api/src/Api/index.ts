import {Service} from '@roots/bud-framework'

import alias from './Repository/alias'
import assets from './Repository/assets'
import {config} from './Repository/config'
import {define} from './Repository/define'
import {dev} from './Repository/dev'
import {devtool} from './Repository/devtool'
import entry from './Repository/entry'
import experiments from './Repository/experiments'
import externals from './Repository/externals'
import hash from './Repository/hash'
import minimize from './Repository/minimize'
import persist from './Repository/persist'
import provide from './Repository/provide'
import {proxy} from './Repository/proxy'
import publicPath from './Repository/publicPath'
import run from './Repository/run'
import runtime from './Repository/runtime'
import setPublicPath from './Repository/setPublicPath'
import splitChunks from './Repository/splitChunks'
import {template} from './Repository/template'
import use from './Repository/use'
import watch from './Repository/watch'

/**
 * API repository interface
 *
 * @public
 */
interface Repository {
  alias: alias
  assets: assets
  config: config
  define: define
  dev: dev
  devtool: devtool
  entry: entry
  experiments: experiments
  externals: externals
  hash: hash
  minimize: minimize
  persist: persist
  provide: provide
  proxy: proxy
  publicPath: publicPath
  run: run
  runtime: runtime
  setPublicPath: setPublicPath
  splitChunks: splitChunks
  template: template
  use: use
  watch: watch
}

/**
 * The API class binds all the functions from the {@link @roots/bud-api#Repository}
 * to the {@link @roots/bud-framework#Framework} instance during the
 * {@link @roots/bud-framework#Service.bootstrap} lifecycle event.
 *
 * @public @core
 */
class Api extends Service<Repository> {
  /**
   * A {@link @roots/container#Repository | Repository} of high-level functions used to
   * configure the project
   *
   * @override @public
   */
  public repository: Repository = {
    alias,
    assets,
    config,
    define,
    dev,
    devtool,
    entry,
    experiments,
    externals,
    hash,
    minimize,
    persist,
    provide,
    proxy,
    publicPath,
    run,
    runtime,
    setPublicPath,
    splitChunks,
    template,
    use,
    watch,
  }

  /**
   * {@inheritDoc}
   *
   * @public
   */
  public bootstrap() {
    this.bindMacro(this.all())
  }
}

export {Api, Repository}
