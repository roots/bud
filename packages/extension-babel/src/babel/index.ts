import * as presets from './presets/env'
import * as plugins from './plugins'

export const ident: Framework.Item['ident'] = 'babel'
export const loader: Framework.Item['loader'] = 'babel-loader'
export const options: Framework.Item['options'] = {
  presets: [...Object.values(presets)],
  plugins: [...Object.values(plugins)],
}
