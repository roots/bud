import {argv} from 'yargs'

/**
 * Build mode
 * @typedef {mode: string} mode - 'production'|'development'
 */
const mode = argv?.env ? argv.env : 'production'

/**
 * inProduction
 * @typedef {inProduction: boolean} inProduction - true if build is running in production mode
 */
const inProduction = mode == 'production'

export {argv, inProduction, mode}
