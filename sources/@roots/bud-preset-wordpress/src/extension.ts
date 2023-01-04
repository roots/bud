import type {Bud} from '@roots/bud'
import {Extension} from '@roots/bud-framework/extension'
import {
  dependsOn,
  dependsOnOptional,
  label,
} from '@roots/bud-framework/extension/decorators'

@label(`@roots/bud-preset-wordpress`)
@dependsOn([
  `@roots/bud-preset-recommend`,
  `@roots/bud-wordpress-manifests`,
  `@roots/bud-wordpress-theme-json`,
  `@roots/bud-react`,
])
@dependsOnOptional([`@roots/bud-tailwindcss`])
export default class BudPresetWordPress extends Extension {
  public override async register(bud: Bud) {
    if (bud.extensions.has(`@roots/bud-tailwindcss`)) {
      await bud.extensions.add(`@roots/bud-tailwindcss-theme-json`)
    }
  }
}
