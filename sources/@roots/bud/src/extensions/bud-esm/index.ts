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
@label('esm')
@expose('esm')
export default class Esm extends Extension {
  /**
   * `beforeBuild` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async beforeBuild() {
    this.app.hooks
      .on('build.experiments.outputModule', true)
      .hooks.on('build.output.module', true)

    this.app.project.has('manifest.imports') &&
      this.app.externals(this.app.project.get('manifest.imports'))
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
