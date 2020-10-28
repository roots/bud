import {HotModuleReplacementPlugin} from 'webpack'

export const make: Framework.Extension.Make = () =>
  new HotModuleReplacementPlugin()

export const when: Framework.Extension.When = ({mode, server}) =>
  mode.is('development') && server.getConfigItem('hot') == true
