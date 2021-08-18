import type {Framework} from '@roots/bud-framework'
import {isFunction} from 'lodash'

class Base {
  public normalizeInput<T = any>(
    input: T | ((app: Framework) => T),
  ) {
    return isFunction(input) ? input : () => input
  }
}

export {Base}
