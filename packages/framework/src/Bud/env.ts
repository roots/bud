import dotenv from 'dotenv'
import {join} from 'path'

/**
 * Environment variables
 */
export const env = Object.freeze(
  dotenv.config({
    path: join(process.cwd(), '.env'),
  }).parsed ?? {},
)
