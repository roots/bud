import BudInterface from '../Bud'
import Compiler, {CompilerInterface} from '@roots/bud-compiler'
import Server, {injectClient} from '@roots/bud-server'

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
      injectClient({
        entrypoints: this.options.get('webpack.entry'),
        hotOnly: this.options.get('server.hotOnly') ?? false,
      }),
    )
  }

  const webpackConfig = this.config(this)
  const serverConfig = this.options.get('server')

  const compiler: CompilerInterface = new Compiler(
    '@roots/bud',
    webpackConfig,
  )

  if (this.mode.is('development')) {
    this.server = new Server({
      compiler: compiler.compiler,
      config: webpackConfig,
    })

    this.server.addDevMiddleware()
    serverConfig.hot && this.server.addHotMiddleware()
    serverConfig.to?.host && this.server.addProxyMiddleware()
  }

  this.cli({
    name: this.name,
    compiler,
    server: this.server,
    webpackConfig,
    serverConfig,
    terminate: this.terminate,
  })
}

export {compile as default}
