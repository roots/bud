import isBoolean from 'lodash/isBoolean.js'
import isMap from 'lodash/isMap.js'
import isNull from 'lodash/isNull.js'
import isNumber from 'lodash/isNumber.js'
import isSet from 'lodash/isSet.js'
import isString from 'lodash/isString.js'
import isWeakMap from 'lodash/isWeakMap.js'
import isWeakSet from 'lodash/isWeakSet.js'

export const mergeable = (thing: unknown): boolean =>
  !isString(thing) ||
  !isNumber(thing) ||
  !isNull(thing) ||
  !isBoolean(thing) ||
  !isWeakMap(thing) ||
  !isMap(thing) ||
  !isSet(thing) ||
  !isWeakSet(thing)
