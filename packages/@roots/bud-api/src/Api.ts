import {
  Api as Contract,
  Framework,
  Service,
} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import * as api from './methods'

export class Api extends Service implements Contract {
  public name: Service['name'] = '@roots/bud-api'

  public repository: Service['repository'] = api

  @bind
  public bootstrap(app: Framework): void {
    Object.assign(
      app,
      this.getEntries().reduce(this.bindMethod, {}),
    )
  }

  @bind
  public bindMethod(
    acc: {[key: string]: CallableFunction},
    [name, fn]: [string, CallableFunction],
  ): {
    [key: string]: CallableFunction
  } {
    return {
      ...acc,
      [name]: fn.bind(this.app),
    }
  }
}
