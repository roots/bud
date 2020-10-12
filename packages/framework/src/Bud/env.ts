import dotenv from 'dotenv'
import {join} from 'path'

/**
 * Environment variables
 */
export default Object.freeze(
  dotenv.config({
    path: join(process.cwd(), '.env'),
  }).parsed ?? {},
)
