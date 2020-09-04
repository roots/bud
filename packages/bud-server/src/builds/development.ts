import middleware from '../middleware'
import injectEntrypoints from '../util/injectEntrypoints'
import {Bud} from '@roots/bud-typings'

interface BeforeArgs {
  bud: Bud
}
const before: (BeforeArgs) => void = ({bud}) => {
  bud.options.set('webpack.entry', injectEntrypoints(bud))
}

const development = {
  before,

  after: ({bud, compilerCallback, expressCallback}) => {
    bud.server.use(function (req, res, next) {
      expressCallback(req)
      next()
    })

    middleware.map(ware => bud.server.use(ware(bud)))

    bud.server.listen(
      bud.options.get('webpack.devServer').port,
      bud.options.get('webpack.devServer').host,
    )

    bud.compiler.hooks.done.tap('bud', compilerCallback)
  },
}

export {development as default}
