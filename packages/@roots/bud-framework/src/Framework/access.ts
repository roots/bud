import {isFunction} from 'lodash'

import type {Framework} from './'

interface access<I = any> {
  (this: Framework, value: Framework.Tapable | I): I
}

function access<I = any>(
  this: Framework,
  value: Framework.Tapable | I,
) {
  return isFunction(value) ? value.bind(this)(this) : value
}

export {access}
