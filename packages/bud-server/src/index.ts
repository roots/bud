import webpack from 'webpack'
import middleware from './middleware'
import injectEntrypoints from './injectEntrypoints'
import createDomain from './createDomain'
import tapCompiler from './tapCompiler'

const server = bud => {
  bud.options.set('webpack.entry', injectEntrypoints(bud))

  bud.apply('compiler', webpack(bud.config(bud)))

  middleware.map(ware => bud.server.use(ware(bud)))

  bud.server.listen(
    bud.options.get('webpack.devServer').port,
    bud.options.get('webpack.devServer').host,
  )

  tapCompiler(bud)
}

export {server as default}
