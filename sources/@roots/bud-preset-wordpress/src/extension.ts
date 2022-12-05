import {Extension} from '@roots/bud-framework/extension'
import {
  dependsOn,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'

@label(`@roots/bud-preset-wordpress`)
@dependsOn([
  `@roots/bud-preset-recommend`,
  `@roots/bud-wordpress-externals`,
  `@roots/bud-wordpress-dependencies`,
  `@roots/bud-wordpress-manifests`,
  `@roots/bud-react`,
])
@expose(`wordpress`)
export default class BudPresetWordPress extends Extension {}
