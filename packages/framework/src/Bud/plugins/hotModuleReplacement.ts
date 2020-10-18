import {HotModuleReplacementPlugin} from 'webpack'

export const make: Framework.Extension.Make = () =>
  new HotModuleReplacementPlugin()

export const when: Framework.Extension.When = ({features}) =>
  features.enabled('hot')
