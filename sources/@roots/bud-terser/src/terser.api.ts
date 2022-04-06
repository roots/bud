import type {Bud} from '@roots/bud-framework'

import {Options} from './'

export interface terser {
  (this: Bud, options: Options): Bud
}

export const terser: terser = function (this: Bud, options: Options): Bud {
  this.extensions.get('@roots/bud-terser').setOptions(options)

  return this
}
