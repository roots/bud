import {factory} from '@roots/bud'

/**
 * For info on configuring webpack with a function or promise:
 * {@link https://webpack.js.org/configuration/configuration-types/#exporting-a-promise}
 */
export default async env => {
  /**
   * Instantiate bud
   */
  const bud = await factory()

  /**
   * Set entrypoints and do other config as usual
   */
  bud.when(env.production, () => bud.minimize().splitChunks())

  /**
   * This is our final config object. Return it for webpack.
   */
  return await bud.build.make()
}
