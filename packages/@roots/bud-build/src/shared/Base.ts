import {isFunction} from 'lodash'
import {Framework} from '@roots/bud-framework'

export class BaseComponent {
  public normalizeInput<T = any>(
    input: T | ((app: Framework) => T),
  ) {
    return isFunction(input) ? input : () => input
  }
}
