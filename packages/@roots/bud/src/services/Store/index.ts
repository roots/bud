import {Service} from '@roots/bud-framework'
import {Store as Contract} from '@roots/bud-typings'
import _ from 'lodash'
import {args} from '../../bootstrap/args'
import {env} from '../../bootstrap/env'
import {options} from '../../bootstrap/options'
import * as patterns from '../../bootstrap/patterns'

/**
 * Store service.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 */
export class Store extends Service implements Contract {
  /**
   * Service name
   */
  public name = 'service/store'

  /**
   * Service repository
   */
  public repository = {args, env, patterns, options}

  /**
   * Get
   */
  public get<T = any>(path: Contract.Keys) {
    return _.get(this.repository, path) as T
  }
}
