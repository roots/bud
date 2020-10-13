import {CleanWebpackPlugin} from 'clean-webpack-plugin'

export const when: Adapter.when = ({features}) =>
  features.enabled('clean')

export const make: Adapter.make = new CleanWebpackPlugin()
