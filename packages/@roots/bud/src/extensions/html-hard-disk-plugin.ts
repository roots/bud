import type {Module} from '@roots/bud-framework'

import HtmlHardDiskPlugin from 'html-webpack-harddisk-plugin'

interface Options {
  /**
   * Where to save compiled assets
   */
  outputPath?: string
}

export const name = `html-hard-disk-plugin`

export const options: Module.Options<Options> = app => ({
  outputPath: app.subscribe('location/dist'),
})

export const make: Module.Make<
  typeof HtmlHardDiskPlugin,
  Options
> = options => new HtmlHardDiskPlugin(options.all())

export const when: Module.When = ({store}) =>
  store.isTrue('options.html.enabled')
