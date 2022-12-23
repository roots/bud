import {factory} from '@roots/bud'

/**
 * Run this example with:
 *
 * ```sh
 * yarn node 01-simple.js
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
 * Add extensions
 */
await bud.extensions.add([`@roots/bud-swc`])

/**
 * Set entrypoints and do other config as usual
 */
bud.minimize(false).splitChunks(false)

/**
 * Run build
 */
await bud.run()
