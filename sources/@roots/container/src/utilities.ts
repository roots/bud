import isBoolean from 'lodash-es/isBoolean.js'
import isMap from 'lodash-es/isMap.js'
import isNull from 'lodash-es/isNull.js'
import isNumber from 'lodash-es/isNumber.js'
import isSet from 'lodash-es/isSet.js'
import isString from 'lodash-es/isString.js'
import isWeakMap from 'lodash-es/isWeakMap.js'
import isWeakSet from 'lodash-es/isWeakSet.js'

export const mergeable = (thing: unknown): boolean =>
  !isString(thing) ||
  !isNumber(thing) ||
  !isNull(thing) ||
  !isBoolean(thing) ||
  !isWeakMap(thing) ||
  !isMap(thing) ||
  !isSet(thing) ||
  !isWeakSet(thing)
