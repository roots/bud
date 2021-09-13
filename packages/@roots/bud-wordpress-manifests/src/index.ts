/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @see https://roots.io/bud
 *
 * @remarks
 * - 💁 Composable - Build boss web applications with a modular, hackable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @remarks
 * Wordpress manifests are a collection of files
 * that are used in a WordPress theme or plugin.
 *

 * @packageDocumentation
 */

import {Extension} from '@roots/bud-framework'
import MergedManifestPlugin from '@roots/merged-manifest-webpack-plugin'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-wordpress-manifests': Extension.CompilerPlugin
      '@roots/merged-manifest-webpack-plugin': Extension.CompilerPlugin
    }
  }
}

const extension: Extension.CompilerPlugin<
  MergedManifestPlugin,
  null
> = {
  name: '@roots/bud-wordpress-manifests',
  make: () => new MergedManifestPlugin(),
}

export const {name, make} = extension
