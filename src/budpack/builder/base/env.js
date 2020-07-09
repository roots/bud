import {join} from 'path'
import dotenv from 'dotenv'
import {paths} from './paths'

/**
 * Environment variables container.
 * @typedef {Object} env
 */
const envRaw = () => dotenv.config({
  path: join(paths.project, '.env'),
})

const env = {
  ...(envRaw ? envRaw : {}),
}

export {env}
