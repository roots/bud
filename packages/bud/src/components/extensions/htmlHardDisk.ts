import HtmlHardDiskPlugin from 'html-webpack-harddisk-plugin'
import type {Extension} from '@roots/bud-typings'

export const options: Extension.Module.Options = null

export const make: Extension.Module.Make = opts =>
  new HtmlHardDiskPlugin(opts)

export const when: Extension.Module.When = ({features}) =>
  features.enabled('html')
