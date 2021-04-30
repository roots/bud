import {Module} from '@roots/bud-framework'
import HtmlHardDiskPlugin from 'html-webpack-harddisk-plugin'

type Plugin = typeof HtmlHardDiskPlugin

interface Options {
  outputPath?: string
}

const extension: Module<Plugin, Options> = {
  name: 'html-hard-disk-plugin',
  options: ({path}) => ({outputPath: path('dist')}),
  make: options => new HtmlHardDiskPlugin(options.all()),
  when: ({store}) => store.isTrue('html'),
}

export {extension as default}
