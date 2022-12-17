import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  dependsOnOptional,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

interface Options {
  acorn: `v2` | `v3`
}

/**
 * roots/sage support extension
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOn`
 */
@label(`@roots/sage`)
@dependsOn([
  `@roots/sage/wp-theme-json`,
  `@roots/bud-preset-wordpress`,
  `@roots/sage/acorn`,
])
@dependsOnOptional([`@roots/bud-tailwindcss`])
@options<Options>({acorn: `v2`})
@expose(`sage`)
export class Sage extends Extension<Options> {
  /**
   * `boot` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async register(app: Bud) {
    if (app.extensions.has(`@roots/bud-tailwindcss`))
      await app.extensions.add(`@roots/sage/wp-theme-json-tailwind`)

    app.hooks.on(`build.output.uniqueName`, `@roots/bud/sage`)

    /* Set paths */
    app.setPath({
      '@src': `resources`,
      '@resources': `@src`,
      '@fonts': `@src/fonts`,
      '@images': `@src/images`,
      '@scripts': `@src/scripts`,
      '@styles': `@src/styles`,
      '@dist': `public`,
      '@public': `@dist`,
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

  /**
   * `configAfter` callback
   *
   * @public
   */
  @bind
  public override async configAfter(app: Bud) {
    if (this.options.acorn === `v2`)
      await app.extensions.add(`@roots/sage/acorn-v2-public-path`)
  }

  /**
   * Set acorn version
   *
   * @public
   */
  @bind
  public setAcornVersion(version: 'v2' | 'v3') {
    this.setOption(`acorn`, version)
  }
}
