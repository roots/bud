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
  public async register({isProduction, path}) {
    /* Set paths */
    this.app.setPath({
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
    this.app.alias({
      '@fonts': path(`@fonts`),
      '@images': path(`@images`),
      '@scripts': path(`@scripts`),
      '@styles': path(`@styles`),
    })

    /**
     * Optimize
     */
    this.app.when(
      isProduction,
      () => this.app.minimize().hash().runtime(`single`).splitChunks(),
      () => this.app.devtool(),
    )
  }
}
