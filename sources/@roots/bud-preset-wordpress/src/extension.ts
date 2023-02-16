import type {Bud} from '@roots/bud'
import {Extension} from '@roots/bud-framework/extension'
import {dependsOn, label} from '@roots/bud-framework/extension/decorators'

/**
 * WordPress preset
 */
@label(`@roots/bud-preset-wordpress`)
@dependsOn([
  `@roots/bud-preset-recommend`,
  `@roots/bud-wordpress-manifests`,
  `@roots/bud-wordpress-theme-json`,
  `@roots/bud-react`,
])
export default class BudPresetWordPress extends Extension {
  /**
   * {@link Extension.boot}
   */
  public override async boot(bud: Bud) {
    if (bud.extensions.has(`@roots/bud-tailwindcss`)) {
      await bud.extensions.add(`@roots/bud-tailwindcss-theme-json`)
    }

    bud.react.refresh.enable(false)
  }
}
