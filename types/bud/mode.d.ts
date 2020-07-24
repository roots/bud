import { argv } from 'yargs';
import type { Mode, Production } from './types';
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
 * ## bud.inProduction
 *
 * True if bud.mode is strictly equal to "production"
 */
declare const inProduction: Production;
export { argv as arguments, inProduction, mode };
//# sourceMappingURL=mode.d.ts.map