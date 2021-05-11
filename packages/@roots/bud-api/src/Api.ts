import {Framework, Service} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import * as api from './methods'

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
    acc: {[key: string]: (this: Framework) => any},
    [name, fn]: [string, (this: Framework) => any],
  ) {
    return {
      ...acc,
      [name]: fn.bind(this.app),
    }
  }
}
