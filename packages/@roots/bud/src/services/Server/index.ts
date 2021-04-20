import {Server as Base} from '@roots/bud-server'
import express from 'express'
import {boundMethod as bind} from 'autobind-decorator'

export class Server extends Base {
  public name = 'service/server'

  /**
   * Service register
   */
  @bind
  public register(): void {
    this.instance = express()

    this.config = this.app.container(
      this.app.store.get('server'),
    )
  }
}
