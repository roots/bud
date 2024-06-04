import { factory } from '@roots/bud'

/**
 * Run this example with:
 *
 * ```sh
 * yarn webpack
 * ```
 */

/**
 * Create a new bud instance.
 */
const bud = await factory({
  clean: false,
  dashboard: false,
})

/**
 * Configure bud as you would in your project.
 */
bud.setPath(`@dist`, `dist/build-b`)

/**
 * Export the final config for webpack to consume.
 *
 * - You probably want to set `stats`, since bud.js doesn't use this interface.
 * - You'll also want to set up `watch` and `server` options as
 * bud.js doesn't use these either.
 */
export default {
  ...(await bud.build.make()),
  stats: true,
  watch: bud.isDevelopment,
}
