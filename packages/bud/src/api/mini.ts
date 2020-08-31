import type {Bud} from './types'

export declare type Mini = () => Bud

const mini: Mini = function (): Bud {
  this.features.enable('minify')

  return this
}

export {mini}
