import Plugin from '@roots/merged-manifest-webpack-plugin'
import {Framework} from '@roots/bud-typings'

/**
 * @roots/bud-wordpress-manifests boot
 */
export const use = (bud: Framework): Framework =>
  bud.use([
    '@roots/bud-entrypoints',
    '@roots/bud-wordpress-externals',
    [
      '@roots/merged-manifest-webpack-plugin',
      {
        make: (_opts, bud) =>
          new Plugin({
            entrypointsName: bud.extensions.get(
              '@roots/bud-entrypoints.options.name',
            ),
            wordpressName: bud.extensions.get(
              '@roots/bud-wordpress-externals.opotions.name',
            ),
            file: 'entrypoints.json',
          }),
      },
    ],
  ])
