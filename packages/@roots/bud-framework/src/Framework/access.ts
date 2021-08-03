import {isFunction} from 'lodash'

import type {Framework} from './'

interface access<I = any> {
  (this: Framework, value: Framework.Tapable<I> | I): I
}

const access: access = function (value) {
  return isFunction(value) ? value(this) : value
}

export {access}
