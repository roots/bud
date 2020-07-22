import {join} from 'path'
import dotenv from 'dotenv'
import {paths} from './paths'

/**
 * Environment variables container.
 */
const envRaw = dotenv.config({
  path: join(paths.project, '.env'),
}).parsed

const env: Environment = {
  ...envRaw,
}

export {env}

export type Environment = any
