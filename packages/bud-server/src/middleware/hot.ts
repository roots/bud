import middleware from 'webpack-hot-middleware'
import createDomain from '../util/createDomain'

const hot = bud =>
  middleware(bud.compiler, {
    path: `/__webpack_hmr`,
    heartbeat: 2000,
    log: false,
  })

export {hot as default}
