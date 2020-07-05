/** Modules */
import {argv} from 'yargs'

/**
 * Build mode
 * @type {string}
 */
const mode = argv?.env ? argv.env : 'production'

/**
 * inProduction
 * @typedef {boolean.<inProduction>}
 */
const inProduction = mode == 'production'

export {
  argv,
  inProduction,
  mode,
}
