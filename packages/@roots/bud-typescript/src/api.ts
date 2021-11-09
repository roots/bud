import {Framework} from '@roots/bud-framework'

import * as BudTypeCheckPlugin from './BudTypeCheckPlugin'

export interface typecheck {
  (this: Framework, enabled?: boolean): Framework
}

export const typecheck: typecheck = function (enabled = true) {
  !enabled &&
    this.extensions.has('fork-ts-checker-plugin') &&
    this.extensions.remove('fork-ts-checker-plugin')

  this.extensions.enqueue(BudTypeCheckPlugin)

  return this
}
