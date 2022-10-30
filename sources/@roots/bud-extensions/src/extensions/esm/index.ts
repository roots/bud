import type {Bud, Config} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
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
export default class Esm extends Extension {
  /**
   * `buildBefore` callback
   *
   * @public
   * @decorator `@bind`
   */
  public async buildBefore(app: Bud) {
    app.hooks.fromMap({
      'build.experiments': experiments => ({
        ...(experiments ?? {}),
        outputModule: true,
      }),
      'build.output.module': true,
    })

    app.context.manifest?.imports &&
      app.hooks.on(
        `build.externals`,
        (existant: Config.Configuration['externals']) => ({
          ...(existant ?? ({} as any)),
          ...(app.context.manifest.imports as any),
        }),
      )
  }
}
