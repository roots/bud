import get from 'lodash/get'
import isArray from 'lodash/isArray'
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

const lodash = {
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

export {lodash}
