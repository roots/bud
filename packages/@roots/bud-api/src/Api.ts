import {Api as Contract, Service} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import * as api from './methods'

export class Api extends Service implements Contract {
  public name = '@roots/bud-api'

  public repository = api

  @bind
  public bootstrap(app) {
    Object.assign(
      app,
      this.getEntries().reduce(this.bindMethod, {}),
    )
  }

  @bind
  public bindMethod(
    acc,
    [name, fn]: [string, CallableFunction],
  ) {
    return {
      ...acc,
      [name]: fn.bind(this.app),
    }
  }
}
