import HtmlHardDiskPlugin from 'html-webpack-harddisk-plugin'
import type {Extension} from '@roots/bud-extensions'

export const options: Extension.Options = null

export const make: Extension.Make = opts =>
  new HtmlHardDiskPlugin(opts)

export const when: Extension.When = ({features}) =>
  features.enabled('html')
