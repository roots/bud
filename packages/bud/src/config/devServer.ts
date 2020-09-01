import type {Bud} from '@roots/bud-typings'
import type {WebpackDevServer} from '@roots/bud-typings'

type DevServerBuilder = (bud: Bud) => WebpackDevServer

const devServer: DevServerBuilder = bud =>
  bud.hooks.filter('webpack.devServer', {
    devServer: {
      /**
       * @see @roots/bud-compiler
       * @see @roots/bud-server
       */
    },
  })

export {devServer}
export type {DevServerBuilder}
