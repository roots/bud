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
@dependsOn([`@roots/bud-preset-wordpress`, `@roots/sage/acorn`])
@dependsOnOptional([`@roots/bud-tailwindcss`])
@expose(`sage`)
export class Sage extends Extension<Options> {
  /**
   * `boot` callback
   */
  @bind
  public override async register(bud: Bud) {
    bud.hooks.on(`build.output.uniqueName`, `@roots/bud/sage/${bud.label}`)

    /* Set paths */
    bud.setPath({
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
    bud.alias({
      '@fonts': bud.path(`@fonts`),
      '@images': bud.path(`@images`),
      '@scripts': bud.path(`@scripts`),
      '@styles': bud.path(`@styles`),
    })

    /**
     * Optimize
     */
    bud.when(
      bud.isProduction,
      () => bud.minimize().hash().runtime(`single`).splitChunks(),
      () => bud.devtool(),
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
