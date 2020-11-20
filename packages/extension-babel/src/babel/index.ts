import * as presets from './presets/env'
import * as plugins from './plugins'
import {Item} from '@roots/bud-typings'

export const ident: Item.Contract['ident'] = 'babel'
export const loader: Item.Contract['loader'] = 'babel-loader'
export const options: Item.Contract['options'] = {
  presets: [...Object.values(presets)],
  plugins: [...Object.values(plugins)],
}
