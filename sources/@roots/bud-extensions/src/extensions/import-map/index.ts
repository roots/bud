import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

/**
 * Import map extension
 */
@label(`@roots/bud-extensions/import-map`)
export default class BudImportMapExtension extends Extension {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud) {
    if (!bud.context.manifest?.imports) return

    Object.entries(bud.context.manifest.imports).map(
      ([k, v]: [string, string]) => {
        if (!v.match(/https?:$/)) bud.alias(k, bud.path(v))
      },
    )
  }
}
