import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  dependsOn,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators'

import type AcornExtension from '../acorn/index.js'

/**
 * roots/sage support extension
 *
 * @see {@link https://bud.js.org/extensions/sage}
 */
@label(`@roots/sage`)
@dependsOn([
  `@roots/bud-preset-wordpress`,
  `@roots/sage/acorn`,
  `@roots/sage/blade-loader`,
])
@expose(`sage`)
export class Sage extends Extension {
  /**
   * {@link Acorn}
   */
  public get acorn(): AcornExtension {
    return this.app.extensions.get(`@roots/sage/acorn`)
  }

  /**
   * {@link Extension.register}
   */
  public override async register(bud: Bud) {
    bud.hooks.on(`build.output.uniqueName`, `@roots/bud/sage/${bud.label}`)

    /* Set paths */
    bud.setPath({
      '@src': `resources`,
      '@fonts': `@src/fonts`,
      '@images': `@src/images`,
      '@scripts': `@src/scripts`,
      '@styles': `@src/styles`,
      '@views': `@src/views`,
      '@dist': `public`,
    })

    /* Set aliases */
    bud.alias({
      '@fonts': bud.path(`@fonts`),
      '@images': bud.path(`@images`),
      '@scripts': bud.path(`@scripts`),
      '@styles': bud.path(`@styles`),
      '@views': bud.path(`@views`),
    })

    /* Set runtime single */
    bud.runtime(`single`)

    /**
     * Optimize
     */
    bud.when(
      bud.isProduction,
      () => bud.minimize().hash().splitChunks(),
      () => bud.devtool(),
      `set minimize, hash, splitChunks in production and devtool in development (@roots\/sage)`,
    )
  }

  /**
   * Set acorn version
   *
   * @deprecated This function is deprecated. It is unneeded; you can just remove the call.
   */
  @deprecated(
    `bud.sage`,
    `This function is no longer needed and should be removed`,
  )
  public setAcornVersion(version: 'v2' | 'v3') {}
}
