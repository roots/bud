import type {Framework} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {dotenv, dotenvExpand} from '@roots/bud-support'
import {boundMethod as bind} from 'autobind-decorator'

class Env extends Service<Framework.Index<any>> {
  public name = 'env'

  public bootstrap() {
    this.setStore(this.getParsedEnv())
  }

  /**
   * Returns path to .env file
   *
   * @readonly
   */
  public get envPath(): string {
    return this.app.path('project', '.env')
  }

  /**
   * get parsed .env
   */
  @bind
  public getParsedEnv(): Framework.Index<any> {
    return dotenv?.config
      ? dotenvExpand(dotenv.config({path: this.envPath})).parsed
      : {}
  }
}

export {Env}
