import HtmlHardDiskPlugin from 'html-webpack-harddisk-plugin'
import type {Module} from '@roots/bud-typings'
import {Framework} from '@roots/bud-typings'

interface HtmlWebpackHarddiskPluginOptions {
  /**
   * Path where to save compiled assets
   */
  outputPath?: string
}

export const options: Module.Options<HtmlWebpackHarddiskPluginOptions> = (
  app: Framework,
) => ({
  outputPath: app.dist(),
})

export const make: Module.Make<
  typeof HtmlHardDiskPlugin,
  HtmlWebpackHarddiskPluginOptions
> = options => new HtmlHardDiskPlugin(options.all())

export const when: Module.When = ({store}) =>
  store.enabled('features.html')
