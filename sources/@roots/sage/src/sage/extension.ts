import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  dependsOnOptional,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'

interface Options {
  acorn: `v2` | `v3`
}

/**
 * roots/sage support extension
 *
 * @see https://bud.js.org/extensions/sage/
 */
@label(`@roots/sage`)
@dependsOn([
  `@roots/sage/wp-theme-json`,
  `@roots/bud-preset-wordpress`,
  `@roots/sage/acorn`,
])
@dependsOnOptional([`@roots/bud-tailwindcss`])
@expose(`sage`)
export class Sage extends Extension<Options> {
  /**
   * `boot` callback
   */
  @bind
  public override async register(app: Bud) {
    if (app.extensions.has(`@roots/bud-tailwindcss`))
      await app.extensions.add(`@roots/sage/wp-theme-json-tailwind`)

    app.hooks.on(`build.output.uniqueName`, `@roots/bud/sage/${app.label}`)

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
   * Set acorn version
   *
   * @deprecated - This function is deprecated. It is unneeded; you can just remove the call.
   */
  @bind
  public setAcornVersion(version?: 'v2' | 'v3') {
    this.logger.warn(
      `\n\n`,
      `bud.sage.setAcornVersion: This function is deprecated.\n It is unneeded; you can just remove the call.\n\n`,
      `If you feel that you need to run it you can add the following to your config:\n\n`,
      `bud.use(\`@roots/sage/acorn-v2-public-path\`)\n\n`,
      `If you are experiencing an issue and adding this extension fixes it, please open an issue.\n\n`,
      `https://github.com/roots/bud.\n\n`,
    )
  }
}
