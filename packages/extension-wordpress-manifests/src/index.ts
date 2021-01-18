import MergedManifestPlugin from '@roots/merged-manifest-webpack-plugin'
import EntrypointsPlugin from '@roots/bud-entrypoints'
import ExternalsPlugin from '@roots/bud-wordpress-externals'
import type {Bud} from '@roots/bud'

// Extension identifier
export const name = '@roots/bud-wordpress-manifests'

// Extension webpack plugins
export const boot: Bud.Module.Boot = (app: Bud): void => {
  app.extensions.set('@roots/bud-entrypoints', EntrypointsPlugin)

  app.extensions.set(
    '@roots/bud-wordpress-externals',
    ExternalsPlugin,
  )

  app.extensions.set('@roots/merged-manifest-webpack-plugin', {
    make: (options, app: Bud) =>
      new MergedManifestPlugin({
        entrypointsName: app.extensions.access(
          '@roots/bud-entrypoints.options.name',
        ),
        wordpressName: app.extensions.access(
          '@roots/bud-wordpress-externals.options.name',
        ),
        file: 'entrypoints.json',
        ...options,
      }),
  })
}
