import {Bud} from '@roots/bud-typings'

export const publicPath = function (path: string): Bud.Contract {
  this.config.set('output.publicPath', path)

  return this
}
