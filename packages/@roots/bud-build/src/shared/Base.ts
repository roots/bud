import type {Framework} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

const {isFunction} = lodash

export class Base {
  public normalizeInput<T = any>(
    input: T | ((app: Framework) => T),
  ) {
    return isFunction(input) ? input : () => input
  }
}
