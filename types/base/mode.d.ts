/**
 * : boolean} inProduction - true if build is running in production mode
 */
export type inProduction = any
/**
 * : string} mode - 'production'|'development'
 */
export type mode = any
import {argv} from 'yargs'
/**
 * inProduction
 * @typedef {inProduction: boolean} inProduction - true if build is running in production mode
 */
export const inProduction: boolean
/**
 * bud.mode
 *
 * Webpack mode ('development'|'production')
 *
 * Determined by the first match, in order of precedence:
 *
 *  - CLI args
 *  - env file
 *  - fallback ('production')
 *
 * @typedef {mode: string} mode - 'production'|'development'
 */
export const mode: any
export {argv}
//# sourceMappingURL=mode.d.ts.map
