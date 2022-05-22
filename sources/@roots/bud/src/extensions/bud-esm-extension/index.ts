import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'

@label('bud-esm')
@expose('esm')
@dependsOn(['bud-http'])
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
      .hooks.on('build.output.chunkLoading', 'import')
      .hooks.on('build.output.chunkFormat', 'module')
      .hooks.on('build.output.environment', {module: true})
      .hooks.on('build.output.module', true)
      .hooks.on('build.externalsType', 'module')

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
