import BudInterface from '../Bud'
import {injectClient} from '@roots/bud-server'

/**
 * setup devServer
 */
const dev = function () {
  this.server
    .setCompiler(this.compiler.getCompiler())
    .setConfig(this.options.get('server'))
    .addDevMiddleware()

  const serverConf = this.server.getConfig()

  this.when(
    serverConf.hot === true,
    this.server.addHotMiddleware,
  ).when(
    typeof serverConf.to?.host === 'string',
    this.server.addProxyMiddleware,
  )
}

/**
 * Inject hmr loaders
 * @see bud-server
 */
const inject = function () {
  const entrypoints = injectClient({
    entrypoints: this.options.get('webpack.entry'),
  })

  this.options.set('webpack.entry', entrypoints)
}

/**
 * ## bud.compile
 *
 * Compile finalized webpack configuration and run build.
 *
 * ```js
 * bud.compile()
 * ```
 */
export type Compile = () => void

const compile: Compile = function (this: BudInterface) {
  this.when(this.options.get('server.hot'), inject.bind(this))

  this.compiler.setConfig(this.config(this)).compile()

  this.when(this.mode.is('development'), dev.bind(this))

  /**
   * Run CLI.
   */
  this.cli({
    name: this.package?.name,
    compiler: this.compiler,
    server: this.server,
    terminate: this.terminate,
  })
}

export {compile as default}
