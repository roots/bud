import {Framework} from '@roots/bud-typings'

export const minify: Minify = function () {
  this.features.set('minify', true)

  return this
}

export type Minify = (this: Framework) => Framework
