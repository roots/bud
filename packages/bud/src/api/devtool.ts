import type {Bud} from './types'
import type {WebpackOptions} from '@roots/bud-typings'

type Devtool = (devtool: WebpackOptions.Devtool) => Bud

const devtool: Devtool = function (devtool) {
  this.options.set('devtool', devtool)

  return this
}

export {devtool}
export type {Devtool}
