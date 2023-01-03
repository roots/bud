import {Extension} from '@roots/bud-framework/extension'
import {
  dependsOn,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'

@label(`@roots/bud-preset-wordpress`)
@dependsOn([
  `@roots/bud-preset-recommend`,
  `@roots/bud-wordpress-manifests`,
  `@roots/bud-wordpress-theme-json`,
  `@roots/bud-react`,
])
@expose(`wp`)
export default class BudPresetWordPress extends Extension {}
