import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * roots/sage support extension
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOn`
 */
@label(`@roots/sage`)
@dependsOn([
  `@roots/sage/acorn`,
  `@roots/sage/wp-theme-json`,
  `@roots/bud-preset-wordpress`,
])
export default class Sage extends Extension {
  /**
   * `boot` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register(app: Bud) {
    /* Set paths */
    app.setPath({
      '@src': `resources`,
      '@dist': `public`,
      '@resources': `@src`,
      '@public': `@dist`,
      '@fonts': `@src/fonts`,
      '@images': `@src/images`,
      '@scripts': `@src/scripts`,
      '@styles': `@src/styles`,
      '@views': `@src/views`,
    })

    /* Set aliases */
    app.alias({
      '@fonts': app.path(`@fonts`),
      '@images': app.path(`@images`),
      '@scripts': app.path(`@scripts`),
      '@styles': app.path(`@styles`),
    })

    /**
     * Optimize
     */
    app.when(
      app.isProduction,
      () => app.minimize().hash().runtime(`single`).splitChunks(),
      () => app.devtool(),
    )
  }
}
