import BudInterface from '../Bud'
import Compiler, {
  CompilerInterface,
  injectHmr,
} from '@roots/bud-compiler'
import Server from '@roots/bud-server'

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
  if (this.options.get('server.hot')) {
    this.options.set(
      'webpack.entry',
      injectHmr({
        entrypoints: this.options.get('webpack.entry'),
        hotOnly: this.options.get('server.hotOnly'),
      }),
    )
  }

  const webpackConfig = this.config(this)
  const serverConfig = this.options.get('server')

  const compiler: CompilerInterface = new Compiler(
    '@roots/bud',
    webpackConfig,
  )

  let server: Server = null

  if (this.mode.is('development')) {
    server = new Server({
      compiler: compiler.compiler,
      config: webpackConfig,
    })

    server.addDevMiddleware()
    serverConfig.hot && server.addHotMiddleware()
    serverConfig.to?.host && server.addProxyMiddleware()
  }

  this.cli({
    name: this.name,
    compiler,
    server,
    webpackConfig,
    serverConfig,
    terminate: this.terminate,
  })
}

export {compile as default}
