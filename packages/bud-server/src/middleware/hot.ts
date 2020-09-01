import middleware from 'webpack-hot-middleware'
import {Bud} from '@roots/bud-typings'

const hot = (bud: Bud) =>
  middleware(bud.compiler, {
    path: `/__webpack_hmr`,
    heartbeat: 2000,
    log: false,
  })

export {hot as default}
