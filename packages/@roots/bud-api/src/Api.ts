import {Framework, Service} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import * as api from './methods'

/**
 * Configuration api
 *
 * [🏡 Project](https://roots.io/bud)
 * [🐙 git](https://www.github.com/tree/stable/packages/@roots/bud-api)
 * [📦 npm](https://www.npmjs.com/package/@roots/bud-api)
 */
export class Api extends Service {
  public name = '@roots/bud-api'

  @bind
  public bootstrap() {
    Object.assign(
      this.app,
      Object.entries(api).reduce(this.bindMethod, {}),
    )
  }

  @bind
  private bindMethod(
    acc,
    [name, fn]: [string, (this: Framework) => any],
  ) {
    return {
      ...acc,
      [name]: fn.bind(this.app),
    }
  }
}
