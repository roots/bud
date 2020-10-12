import {CleanWebpackPlugin} from 'clean-webpack-plugin'

export const when: Adapter.when = bud =>
  bud.store['features'].enabled('clean')

export const make: Adapter.make = new CleanWebpackPlugin()
