import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'
import isString from '@roots/bud-support/lodash/isString'

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

    Object.entries(bud.context.manifest.imports)
      .filter(([k, v]) => isString(k) && isString(v))
      .map(([k, v]) => {
        if (v && !(v as any).match(/https?:^/)) bud.alias(k, bud.path(v))
      })
  }
}
