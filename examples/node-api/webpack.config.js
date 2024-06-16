import {factory} from '@roots/bud'

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
})

/**
 * Configure bud as you would in your project.
 */
bud.setPath(`@dist`, `dist/build-b`).html()

const config = await bud.build.make()

/**
 * Export the final config for webpack to consume.
 *
 * You'll want to set up `watch` and `devServer` options as
 * bud.js doesn't use these either.
 */
export default {
  ...config,
  devServer: {
    host: 'localhost',
    port: 3010,
  },
}
