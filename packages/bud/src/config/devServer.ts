import type {Bud} from './types'
import type {WebpackDevServer} from '@roots/bud-typings'

type DevServerBuilder = (bud: Bud) => WebpackDevServer

const devServer: DevServerBuilder = bud =>
  bud.hooks.filter('webpack.devServer', {
    devServer: {
      host: 'localhost',
      port: 3000,
      hot: bud.options.get('webpack.devServer.hot'),
    },
  })

export {devServer}
export type {DevServerBuilder}
