import {Service} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import dotenv from 'dotenv'
import expand from 'dotenv-expand'

export class Env extends Service {
  public name = 'service/env'

  public get envPath(): string {
    return this.app.path('project', '.env')
  }

  @bind
  public getParsedEnv() {
    return expand(dotenv.config({path: this.envPath})).parsed
  }

  @bind
  public bootstrap() {
    this.setStore(this.getParsedEnv())
  }
}
