import _ from 'lodash-es'

export const mergeable = (thing: unknown): boolean =>
  !_.isString(thing) ||
  !_.isNumber(thing) ||
  !_.isNull(thing) ||
  !_.isBoolean(thing) ||
  !_.isWeakMap(thing) ||
  !_.isMap(thing) ||
  !_.isSet(thing) ||
  !_.isWeakSet(thing)
