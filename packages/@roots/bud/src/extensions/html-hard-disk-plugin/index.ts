import {Module} from '@roots/bud-framework'
import htmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'

export type Extension = Module<
  typeof htmlWebpackHarddiskPlugin,
  {
    outputPath?: string
  }
>

const plugin: Module = {
  name: 'html-hard-disk-plugin',
  options: ({path}) => ({
    outputPath: path('dist'),
  }),
  make: options => new htmlWebpackHarddiskPlugin(options.all()),
  when: ({store}) => store.isTrue('html'),
}

export default plugin
export const {name, options, make, when} = plugin
