import HtmlHardDiskPlugin from 'html-webpack-harddisk-plugin'
import {Bud} from '../../Bud'

interface HtmlWebpackHarddiskPluginOptions {
  /**
   * Path where to save compiled assets
   */
  outputPath?: string
}

export const options: Bud.Module.Options<HtmlWebpackHarddiskPluginOptions> = app => ({
  outputPath: app.dist(),
})

export const make: Bud.Module.Make<
  typeof HtmlHardDiskPlugin,
  HtmlWebpackHarddiskPluginOptions
> = options => new HtmlHardDiskPlugin(options.all())

export const when: Bud.Module.When = ({options}) =>
  options.enabled('html')
