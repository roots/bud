import {factory} from '@roots/bud'

/**
 * Run this example with:
 *
 * ```sh
 * yarn node node-script.js
 * ```
 */

/**
 * Instantiate bud
 */
const bud = await factory()

/**
 * Set path
 */
bud.setPath(`@dist`, `dist/build-a`)

/**
 * Run build
 */
await bud.run()
