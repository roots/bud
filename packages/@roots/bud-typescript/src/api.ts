import {Framework} from '@roots/bud-framework'

import * as BudTypeCheckPlugin from './BudTypeCheckPlugin'

interface typecheck {
  (this: Framework, enabled?: boolean): Framework
}

const typecheck: typecheck = function (enabled = true) {
  !enabled &&
    this.extensions.has('fork-ts-checker-plugin') &&
    this.extensions.remove('fork-ts-checker-plugin')

  this.extensions.add(BudTypeCheckPlugin)

  return this
}

export {typecheck}
