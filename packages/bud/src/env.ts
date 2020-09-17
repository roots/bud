import {join} from 'path'
import dotenv from 'dotenv'

const env =
  dotenv.config({
    path: join(process.cwd(), '.env'),
  }).parsed ?? {}

export {env as default}
