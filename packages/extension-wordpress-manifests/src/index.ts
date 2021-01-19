import MergedManifestPlugin from '@roots/merged-manifest-webpack-plugin'
import * as EntrypointsPlugin from '@roots/bud-entrypoints'
import * as ExternalsPlugin from '@roots/bud-wordpress-externals'
import type {Bud} from '@roots/bud'

// Extension identifier
export const name = '@roots/bud-wordpress-manifests'

// Extension webpack plugins
export const boot: Bud.Module.Boot = ({
  extensions,
  disk,
}: Bud): void => {
  if (
    !disk.get('project').has('style.css') ||
    !disk
      .get('project')
      .read('style.css')
      .includes('Theme name:')
  ) {
    return
  }

  !extensions.has(EntrypointsPlugin.name) &&
    extensions.add(EntrypointsPlugin.name, EntrypointsPlugin)

  !extensions.has(ExternalsPlugin.name) &&
    extensions.add(ExternalsPlugin.name, ExternalsPlugin)

  extensions.add('@roots/merged-manifest-webpack-plugin', {
    make: () => new MergedManifestPlugin(),
  })
}
