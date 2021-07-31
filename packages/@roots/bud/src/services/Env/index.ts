import {Service} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import env from 'dotenv'
import expand from 'dotenv-expand'

export class Env extends Service {
  public name = 'env'

  public get envPath(): string {
    return this.app.path('project', '.env')
  }

  @bind
  public getParsedEnv() {
    return env?.config
      ? expand(env.config({path: this.envPath})).parsed
      : {}
  }

  @bind
  public bootstrap() {
    this.setStore(this.getParsedEnv())
  }
}
