import middleware from '../middleware'
import injectEntrypoints from '../util/injectEntrypoints'

const development = {
  before: ({bud}) => {
    bud.features.enabled('hot') &&
      bud.options.set('webpack.entry', injectEntrypoints(bud))
  },

  after: ({bud, compilerCallback, expressCallback}) => {
    /**
     * Callback for internal bud usage
     */
    bud.server.use(function (req, res, next) {
      expressCallback(req)

      next()
    })

    /**
     * Filter for user supplied middleware
     */
    bud.hooks
      .filter('server.use')
      ?.map(ware => bud.server.use(ware))

    /**
     * proxy server and hmr middlewares
     */
    bud.server.use(middleware.dev(bud))

    bud.features.enabled('hot') &&
      bud.server.use(middleware.hot(bud))

    bud.options.get('server.host') &&
      bud.server.use(middleware.proxy(bud))

    /**
     * 🚀
     */
    bud.server.listen(
      bud.options.get('server.to.port') ?? 3000,
      bud.options.get('server.to.host') ??
        bud.options.get('server.from.host') ??
        'localhost',
    )

    bud.compiler.hooks.done.tap('bud', compilerCallback)
  },
}

export {development as default}
