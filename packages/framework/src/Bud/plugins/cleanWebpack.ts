import {CleanWebpackPlugin} from 'clean-webpack-plugin'

export const when: Framework.Extension.When = ({features}) =>
  features.enabled('clean')

export const make: Framework.Extension.Make = new CleanWebpackPlugin()
