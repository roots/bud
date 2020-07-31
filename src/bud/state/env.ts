import dotenv from 'dotenv'
import {container} from '../container'
import {join} from 'path'

/**
 * Environment variables container.
 */
const env = state =>
  new container(
    dotenv.config({
      path: join(state.paths.get('project'), '.env'),
    }).parsed,
  )

export {env}
