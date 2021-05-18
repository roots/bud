import {Service} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import dotenv from 'dotenv'

export class Env extends Service {
  public name = 'service/env'

  public get envPath(): string {
    return this.app.path('project', '.env')
  }

  @bind
  public getParsedEnv() {
    return dotenv.config({path: this.envPath}).parsed
  }

  @bind
  public bootstrap() {
    this.setStore(this.getParsedEnv())
  }
}
