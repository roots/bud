import chunk from 'lodash/chunk'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import isBoolean from 'lodash/isBoolean'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import isNull from 'lodash/isNull'
import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import isUndefined from 'lodash/isUndefined'
import noop from 'lodash/noop'
import omit from 'lodash/omit'
import set from 'lodash/set'

export interface lodash {
  chunk: typeof chunk
  isBoolean: typeof isBoolean
  isFunction: typeof isFunction
  isNull: typeof isNull
  isNumber: typeof isNumber
  isObject: typeof isObject
  isString: typeof isString
  isUndefined: typeof isUndefined
  noop: typeof noop
  omit: typeof omit
  set: typeof set
  get: typeof get
  isArray: typeof isArray
  isEmpty: typeof isEmpty
  isEqual: typeof isEqual
}

export const lodash: lodash = {
  chunk,
  isBoolean,
  isFunction,
  isObject,
  isArray,
  isString,
  isUndefined,
  isNumber,
  isEmpty,
  isEqual,
  isNull,
  get,
  set,
  omit,
  noop,
}
