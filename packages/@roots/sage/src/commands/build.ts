import {Error} from '@roots/bud-dashboard'
import {join} from 'path'

const cwd = process.cwd()

/**
 * Describe
 */
export const describe = 'Compile source assets.'

/**
 * Builder
 */
export const builder = ({example}) =>
  example('Build', 'bud build --mode production')
    .hide('help')
    .hide('version')

/**
 * Handler
 */
export const handler = ({config}): void => {
  try {
    require(join(cwd, config ?? 'sage.config.js'))
  } catch (error) {
    Error(error.toString(), `Error`)
  }
}
