import hotMiddleware from 'webpack-hot-middleware'

const hot = bud =>
  hotMiddleware(bud.compiler, {
    path: '/__webpack_hmr',
    heartbeat: 2000,
  })

export {hot as default}
