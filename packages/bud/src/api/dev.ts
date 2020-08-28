import type {Bud} from './types'
import {WebpackDevServer} from '@roots/bud-typings'

interface DevOptions extends WebpackDevServer {
  enabled: boolean
  watch?: string[]
}

type Dev = (this: Bud, options: DevOptions) => Bud

const dev: Dev = function (options) {
  if (options?.enabled == false) {
    this.features.disable('dev')

    delete options.enabled
  }

  if (options?.watch) {
    this.features.enable('watch')
    this.options.set('watch', options.watch)

    delete options.watch
  }

  this.options.set('webpack.devServer', {
    ...this.options.get('webpack.devServer'),
    contentBase: this.paths.get('dist'),
    ...(options ?? []),
  })

  return this
}

export {dev, Dev}
