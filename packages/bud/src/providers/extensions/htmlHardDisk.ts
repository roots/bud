import HtmlHardDiskPlugin from 'html-webpack-harddisk-plugin'
import type {Module} from '@roots/bud-typings'
import {Bud} from '../../Bud'

interface HtmlWebpackHarddiskPluginOptions {
  /**
   * Path where to save compiled assets
   */
  outputPath?: string
}

export const options: Module.Options<HtmlWebpackHarddiskPluginOptions> = (
  app: Bud,
) => ({
  outputPath: app.dist(),
})

export const make: Module.Make<
  typeof HtmlHardDiskPlugin,
  HtmlWebpackHarddiskPluginOptions
> = options => new HtmlHardDiskPlugin(options.all())

export const when: Module.When = ({options}) =>
  options.enabled('html')
