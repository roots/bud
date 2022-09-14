import {
  isBoolean,
  isMap,
  isNull,
  isNumber,
  isSet,
  isString,
  isWeakMap,
  isWeakSet,
} from '@roots/bud-support/lodash-es'

export const mergeable = (thing: unknown): boolean =>
  !isString(thing) ||
  !isNumber(thing) ||
  !isNull(thing) ||
  !isBoolean(thing) ||
  !isWeakMap(thing) ||
  !isMap(thing) ||
  !isSet(thing) ||
  !isWeakSet(thing)
