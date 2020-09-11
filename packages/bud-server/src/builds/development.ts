import middleware from '../middleware'
import injectEntrypoints from '../util/injectEntrypoints'
import {Bud} from '@roots/bud-types'

interface BeforeArgs {
  bud: Bud
}
const before: (BeforeArgs) => void = ({bud}) => {
  bud.options.set('webpack.entry', injectEntrypoints(bud))
}

const development = {
  before,

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
    middleware.map(ware => bud.server.use(ware(bud)))

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
