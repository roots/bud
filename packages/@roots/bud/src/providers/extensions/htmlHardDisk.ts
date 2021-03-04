import HtmlHardDiskPlugin from 'html-webpack-harddisk-plugin'
import {Module} from '@roots/bud-typings'

interface Options {
  /**
   * Path where to save compiled assets
   */
  outputPath?: string
}

export const name = `html-hard-disk-plugin`

export const options: Module.Options<Options> = app => ({
  outputPath: app.dist(),
})

export const make: Module.Make<
  typeof HtmlHardDiskPlugin,
  Options
> = options => new HtmlHardDiskPlugin(options.all())

export const when: Module.When = ({store}) =>
  store.enabled('options.html')
