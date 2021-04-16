import {Framework, Service} from '@roots/bud-framework'
import * as api from '@roots/bud-api'
import {boundMethod as bind} from 'autobind-decorator'

/**
 * Framework/Api
 *
 * [🏡 Project home](https://roots.io/bud)
 */
export class Api extends Service {
  /**
   * Name
   */
  public name = 'service/api'

  /**
   * Repository
   */
  public repository = api

  /**
   * Register
   */
  @bind
  public register(app: Framework) {
    Object.assign(
      app,
      this.getEntries().reduce(
        (entries, [name, fn]) => ({
          ...entries,
          [name]: fn.bind(app),
        }),
        {},
      ),
    )
  }
}
