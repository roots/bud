import {join} from 'path'
import dotenv from 'dotenv'
import {paths} from './paths'
import type {Environment} from './types'

/**
 * Environment variables container.
 */
const env: Environment = dotenv.config({
  path: join(paths.project, '.env'),
}).parsed

export {env}
