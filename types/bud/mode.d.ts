import { argv } from 'yargs';
/**
 * ## bud.mode
 *
 * Webpack mode ('development'|'production')
 *
 * Determined by the first match, in order of precedence:
 *
 *  - CLI args
 *  - env file
 *
 * Fallback is 'production'.
 */
declare const mode: Mode;
/**
 * inProduction
 */
declare const inProduction: Production;
export { argv as arguments, inProduction, mode };
/**
 * Typings
 */
import type { Configuration } from 'webpack';
export declare type Mode = Configuration['mode'];
export declare type Production = boolean;
//# sourceMappingURL=mode.d.ts.map