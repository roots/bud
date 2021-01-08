import {Framework} from '@roots/bud-typings'
import {ServiceContainer} from '@roots/bud-support'
import dotenv from 'dotenv'
import {join} from 'path'

export default class extends ServiceContainer<Framework> {
  public register(): void {
    this.setStore(
      dotenv.config({
        path: join(process.cwd(), '.env'),
      }).parsed ?? {},
    )
  }
}
