import {Typescript} from '@roots/bud-framework'

import * as BudTypeCheckPlugin from './BudTypeCheckPlugin'

export const typecheck: Typescript.TypeCheck = function (
  enabled = true,
) {
  !enabled &&
    this.extensions.has('fork-ts-checker-plugin') &&
    this.extensions.remove('fork-ts-checker-plugin')

  this.extensions.add(BudTypeCheckPlugin)

  return this
}
