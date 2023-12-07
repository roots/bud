import type {Bud, WebpackPluginInstance} from '@roots/bud-framework'

import {DynamicOption, Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

/**
 * Webpack profile plugin configuration
 */
@label(`@roots/bud-extensions/webpack-profile-plugin`)
@options({
  outputPath: DynamicOption.make((bud: Bud) =>
    bud.path(`@storage`, bud.label, `compiler.profile.json`),
  ),
})
export default class BudProfile extends Extension<
  Record<string, any>,
  WebpackPluginInstance
> {
  /**
   * {@link Extension.make}
   */
  @bind
  public override async make(bud: Bud, options: Record<string, any>) {
    const {debug} = await this.import(
      `@roots/bud-support/webpack`,
      import.meta.url,
    )

    return new debug.ProfilingPlugin({...options})
  }

  /**
   * {@link Extension.when}
   */
  @bind
  public override when(bud: Bud) {
    return bud.context.debug
  }
}
