import MergedManifestPlugin from '@roots/merged-manifest-webpack-plugin'
import {Bud} from '@roots/bud'

// Extension identifier
export const name = '@roots/bud-wordpress-manifests'

// Extension webpack plugins
export const boot: Bud.Module.Boot = ({
  extensions,
}: Bud): void => {
  extensions.add('@roots/merged-manifest-webpack-plugin', {
    make: () => new MergedManifestPlugin(),
  })
}
