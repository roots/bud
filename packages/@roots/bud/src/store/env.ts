import dotenv from 'dotenv'
import {posix} from 'path'
/**
 * Env
 */
export const env = dotenv.config({
  path: posix.join(process.cwd(), '.env'),
}).parsed
