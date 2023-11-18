import type {Bud} from '@roots/bud-framework'
import type {SagePublicAPI} from '@roots/sage'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators'

import type Acorn from '../acorn/index.js'

/**
 * roots/sage
 *
 * @see {@link https://github.com/roots/sage}
 * @see {@link https://bud.js.org/extensions/sage}
 */
@label(`@roots/sage`)
@dependsOn([`@roots/bud-preset-wordpress`])
@options({
  acorn: true,
  blade: true,
})
@expose(`sage`)
class Sage extends Extension {
  /**
   * {@link Acorn}
   */
  public get acorn(): Acorn {
    return this.app.extensions.get(`@roots/sage/acorn`)
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
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore(bud: Bud) {
    this.get(`acorn`) && (await bud.extensions.add(`@roots/sage/acorn`))
    this.get(`blade`) &&
      (await bud.extensions.add(`@roots/sage/blade-loader`))
  }

  /**
   * Enable or disable acorn entrypoints compatibility
   *
   * @default true - enabled
   */
  @bind
  public acornEntrypoints(useAcorn: boolean): SagePublicAPI {
    this.set(`acorn`, useAcorn)
    return this
  }

  /**
   * Enable or disable processing of blade views
   *
   * @default true - enabled
   */
  @bind
  public processBladeViews(useBladeLoader: boolean): SagePublicAPI {
    this.set(`blade`, useBladeLoader)
    return this
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
