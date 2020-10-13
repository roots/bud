import * as presets from './presets/env'
import * as plugins from './plugins'

export const ident: Build.Item['ident'] = 'babel'
export const loader: Build.Item['loader'] = 'babel'
export const options: Build.Item['options'] = {
  presets: [...Object.values(presets)],
  plugins: [...Object.values(plugins)],
}
