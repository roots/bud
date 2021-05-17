import {Server as Base} from '@roots/bud-server'
import express from 'express'
import {boundMethod as bind} from 'autobind-decorator'

export class Server extends Base {
  public name = 'service/server'

  @bind
  public register({container, store}): void {
    this.instance = express()
    this.config = container(store.get('server'))
  }
}
