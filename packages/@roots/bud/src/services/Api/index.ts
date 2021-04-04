import {Service} from '@roots/bud-framework'
import * as api from '@roots/bud-api'

/**
 * Framework/Api
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
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
  public register() {
    Object.assign(
      this.app,
      this.getEntries().reduce(
        (entries, [name, fn]) => ({
          ...entries,
          [name]: fn.bind(this.app),
        }),
        {},
      ),
    )
  }
}
