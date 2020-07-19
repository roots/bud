import { argv } from "yargs";
/**
 * inProduction
 */
export const inProduction: boolean;
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
 */
export const mode: any;
export { argv };
