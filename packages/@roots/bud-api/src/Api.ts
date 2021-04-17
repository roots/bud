import {Framework, Service} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import * as api from './methods'

/**
 * Framework configuration api
 *
 * [🏡 Project](https://roots.io/bud)
 * [🐙 git](https://www.github.com/tree/stable/packages/@roots/bud-api)
 * [📦 npm](https://www.npmjs.com/package/@roots/bud-api)
 */
export class Api extends Service {
  public name = '@roots/bud-api'

  @bind
  public register(app: Framework) {
    Object.entries(api).map(this.bindMethod)
  }

  @bind
  public bindMethod([name, fn]: [string, () => any]) {
    return Object.defineProperty(this.app, name, {
      enumerable: true,
      get() {
        return fn.bind(this.app)
      },
    })
  }
}
