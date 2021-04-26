import {Service, Store as Contract} from '@roots/bud-framework'
import _ from 'lodash'
import {config} from '../../config'

/**
 * Store service.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 */
export class Store extends Service implements Contract {
  public name = 'service/store'

  public repository = config

  public get<T = any>(path: Contract.Keys) {
    return _.get(this.repository, path) as T
  }
}
