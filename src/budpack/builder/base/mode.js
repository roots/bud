import {argv} from 'yargs'

/**
 * Build mode
 * @typedef {string} mode
 */
const mode = argv?.env ? argv.env : 'production'

/**
 * inProduction
 * @typedef {boolean} inProduction - true if build is running in production mode
 */
const inProduction = mode == 'production'

export {argv, inProduction, mode}
