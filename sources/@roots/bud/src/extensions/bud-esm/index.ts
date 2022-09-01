import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Extension enabling ESM compilation output
 *
 * @public
 * @decorator `@label`
 * @decorator `@expose`
 */
@label(`esm`)
@expose(`esm`)
export default class Esm extends Extension {
  /**
   * `buildBefore` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async buildBefore() {
    this.app.hooks
      .on(`build.experiments.outputModule`, true)
      .hooks.on(`build.output.module`, true)

    this.app.context.manifest[`imports`] &&
      this.app.externals(this.app.context.manifest[`imports`])
  }

  /**
   * `when` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async when() {
    return false
  }
}
