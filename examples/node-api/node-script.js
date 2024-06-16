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
 * Add extensions
 */
await bud.extensions.add([`@roots/bud-swc`])

/**
 * Run build
 */
await bud.run()
