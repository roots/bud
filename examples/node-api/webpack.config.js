import {factory} from '@roots/bud'

/**
 * Run this example with:
 *
 * ```sh
 * yarn webpack
 * ```
 */

/**
 * Instantiate bud
 */
const bud = await factory()

/**
 * Set entrypoints and do other config as usual
 */
bud.minimize().splitChunks()

/**
 * Export for webpack
 */
export default bud.build.make
