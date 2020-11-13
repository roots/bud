import {Indexed} from '@roots/container'
import dotenv from 'dotenv'
import {join} from 'path'

/**
 * Environment variables
 */
export const env =
  dotenv.config({
    path: join(process.cwd(), '.env'),
  }).parsed ?? {}

export type Env = Indexed<typeof env>
