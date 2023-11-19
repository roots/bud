import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators'

import type Acorn from '../acorn/index.js'
import type { BladeLoaderExtension } from '../blade-loader/extension.js'

/**
 * roots/sage
 *
 * @see {@link https://github.com/roots/sage}
 * @see {@link https://bud.js.org/extensions/sage}
 */
@label(`@roots/sage`)
@dependsOn([`@roots/bud-preset-wordpress`, `@roots/sage/acorn`, `@roots/sage/blade-loader`])
@expose(`sage`)
class Sage extends Extension {
  /**
   * {@link Acorn}
   */
  public get acorn(): Acorn {
    return this.app.extensions.get(`@roots/sage/acorn`)
  }

  public get blade(): BladeLoaderExtension {
    return this.app.extensions.get(`@roots/sage/blade-loader`)
  }

  /**
   * {@link Extension.register}
   */
  @bind
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
        () => bud.hash(),
        () => bud.devtool(),
      )
      .hooks.on(
        `build.output.uniqueName`,
        bud.label !== `sage`
          ? `@roots/bud/sage/${bud.label}`
          : `@roots/bud/sage`,
      )
  }

  /**
   * Set acorn version
   *
   * @deprecated This function is deprecated. It is unneeded; you can just remove the call.
   */
  @deprecated(
    `bud.sage`,
    `This function is no longer needed. Remove the call from your configuration.`,
  )
  public setAcornVersion(version: 'v2' | 'v3') {}
}

export default Sage
