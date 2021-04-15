import {Server as Base} from '@roots/bud-server'
import {options} from '../../bootstrap/options'
import express from 'express'

export class Server extends Base {
  public register(): void {
    this.instance = express()

    this.config = this.app.container({
      ...options.server,
    })
  }
}
