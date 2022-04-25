import type {Bud} from '@roots/bud-framework'

import {Options} from './'

export interface terser {
  (options: Options): Bud
}

export const terser: terser = function (options: Options): Bud {
  const app = this as Bud
  app.extensions.get('@roots/bud-terser').setOptions(options)
  return app
}
