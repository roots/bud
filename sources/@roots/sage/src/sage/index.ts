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
 * roots/sage
 *
 * @see {@link https://github.com/roots/sage}
 * @see {@link https://bud.js.org/extensions/sage}
 */
@label(`@roots/sage`)
@dependsOn([
  `@roots/bud-preset-wordpress`,
  `@roots/sage/acorn`,
  `@roots/sage/blade-loader`,
])
@expose(`sage`)
class Sage extends Extension {
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
    bud
      .setPath({
        '@dist': `public`,
        '@fonts': `@src/fonts`,
        '@images': `@src/images`,
        '@scripts': `@src/scripts`,
        '@src': `resources`,
        '@styles': `@src/styles`,
        '@views': `@src/views`,
      })
      .when(
        bud.isProduction,
        () => bud.minimize().hash().splitChunks(),
        () => bud.devtool(),
      )
      .hooks.on(`build.output.uniqueName`, `@roots/bud/sage/${bud.label}`)
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

export default Sage
