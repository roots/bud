import type {Bud} from './types'
import {WebpackDevServer} from '@roots/bud-typings'
import {resolve} from 'path'

interface DevOptions extends WebpackDevServer {
  enabled: boolean
  defaults: boolean
  watch: string[]
  chokidar: {(app: any, server: any)}
}

type Dev = (this: Bud, options: DevOptions) => Bud

const dev: Dev = function (options) {
  this.options.set('webpack.devServer', {
    ...this.options.get('webpack.devServer'),
    contentBase: this.paths.get('dist'),
    ...options,
  })
  return this
}

export {dev, Dev}
