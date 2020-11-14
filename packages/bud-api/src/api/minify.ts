import {Bud} from '@roots/bud-typings'

export const minify = function (): Bud.Contract {
  this.features.set('minify', true)

  return this
}
