import {Extension} from '@roots/bud-framework/extension'
import {
  dependsOn,
  label,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import MergedManifestWebpackPlugin from '@roots/merged-manifest-webpack-plugin'

@label(`@roots/bud-wordpress-manifests`)
@plugin(MergedManifestWebpackPlugin)
@dependsOn([
  `@roots/bud-wordpress-dependencies`,
  `@roots/bud-wordpress-externals`,
])
export default class BudMergedManifestAdapter extends Extension<
  null,
  MergedManifestWebpackPlugin
> {}
