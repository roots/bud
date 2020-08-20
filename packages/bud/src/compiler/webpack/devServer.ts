import type {Bud} from './types'
import type {WebpackDevServer} from '@roots/bud-typings'

type DevServerBuilder = (bud: Bud) => WebpackDevServer

const devServer: DevServerBuilder = bud =>
  bud.hooks.filter('webpack.devServer', bud.options.get('dev'))

export {devServer}
export type {DevServerBuilder}
