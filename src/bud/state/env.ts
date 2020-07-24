import {join} from 'path'
import dotenv from 'dotenv'
import {paths} from './paths'
import type {Environment} from './types'

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
