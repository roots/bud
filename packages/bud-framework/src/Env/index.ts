import Service from '../Service'
import dotenv from 'dotenv'
import {join} from 'path'

/**
 * Environment variables
 */
export default class extends Service {
  public name = 'env'

  /**
   * Service register
   */
  public register(): void {
    this.setStore(
      dotenv.config({
        path: join(process.cwd(), '.env'),
      }).parsed ?? {},
    )
  }

  /**
   * Service boot.
   */
  public boot(): void {
    //
  }
}
