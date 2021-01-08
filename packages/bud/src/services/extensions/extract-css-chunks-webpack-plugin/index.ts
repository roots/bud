import Plugin from 'extract-css-chunks-webpack-plugin'
import {Module, Container} from '@roots/bud-typings'

export const make: Module.Make<Plugin, Container> = options =>
  new Plugin(options.all())

export const when: Module.When = bud => bud.mode.is('production')

export const options: Module.Options<any> = () => ({
  filename: '[name].css',
  chunkFilename: '[id].css',
})
