import type {Framework} from '@roots/bud-framework'

import {Options} from './'

export interface terser {
  (this: Framework, options: Options): Framework
}

export const terser: terser = function (
  this: Framework,
  options: Options,
): Framework {
  this.extensions.get('@roots/bud-terser').setOptions(options)

  return this
}
