import * as presets from './presets/env'
import * as plugins from './plugins'

import {Item} from '@roots/bud-typings'

export const ident: Item['ident'] = 'babel'

export const loader: Item['loader'] = 'babel-loader'

export const options: Item['options'] = {
  presets: [...Object.values(presets)],
  plugins: [...Object.values(plugins)],
}
