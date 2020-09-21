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

  this.when(
    this.server.getConfig().hot === true,
    this.server.addHotMiddleware,
  ).when(
    typeof this.server.getConfig().to?.host === 'string',
    this.server.addProxyMiddleware,
  )
}

/**
 * Inject hmr loaders
 */
const inject = function () {
  const entrypoints = injectClient({
    entrypoints: this.options.get('webpack.entry'),
    hotOnly: this.options.get('server.hotOnly') ?? false,
  })

  this.options.set('webpack.entry', entrypoints)
}

/**
 * ## bud.compile
 *
 * Compile finalized webpack configuration and run build.
 *
 * ```
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
    name: this.name,
    compiler: this.compiler,
    server: this.server,
    terminate: this.terminate,
  })
}

export {compile as default}
