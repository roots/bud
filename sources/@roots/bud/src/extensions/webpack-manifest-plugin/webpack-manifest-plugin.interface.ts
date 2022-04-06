import type {Extension} from '@roots/bud-framework'
import {
  ManifestPluginOptions as Options,
  WebpackManifestPlugin,
} from 'webpack-manifest-plugin'

export type Plugin = Extension.Plugin<WebpackManifestPlugin, Options>
