import {isFunction} from 'lodash'
import type {Framework} from '@roots/bud-framework'

export class Base {
  public normalizeInput<T = any>(
    input: T | ((app: Framework) => T),
  ) {
    return isFunction(input) ? input : () => input
  }
}
