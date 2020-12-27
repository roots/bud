import Env from './Env'
import dotenv from 'dotenv'
import {join} from 'path'

export default class extends Env {
  public repository =
    dotenv.config({
      path: join(process.cwd(), '.env'),
    }).parsed ?? {}
}
