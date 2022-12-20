import type {Bud, Config} from '@roots/bud-framework'
import {Extension, ExtensionLiteral} from '@roots/bud-framework/extension'
import {
  disabled,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Extension enabling ESM compilation output
 *
 * @public
 * @decorator `@label`
 * @decorator `@expose`
 * @decorator `@disabled`
 */
@label(`@roots/bud-extensions/esm`)
@expose(`esm`)
@disabled
export default class Esm extends Extension implements ExtensionLiteral {
  /**
   * `buildBefore` callback
   *
   * @public
   * @decorator `@bind`
   */
  public override async buildBefore(bud: Bud) {
    bud.hooks.fromMap({
      'build.experiments': experiments => ({
        ...(experiments ?? {}),
        outputModule: true,
      }),
      'build.output.module': true,
    })

    bud.context.manifest?.imports &&
      bud.hooks.on(
        `build.externals`,
        (existant: Config.Configuration['externals']) => ({
          ...(existant ?? ({} as any)),
          ...(bud.context.manifest.imports as any),
        }),
      )
  }
}
