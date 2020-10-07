import {join} from 'path'
import dotenv from 'dotenv'

export const env =
  dotenv.config({
    path: join(process.cwd(), '.env'),
  }).parsed ?? {}
