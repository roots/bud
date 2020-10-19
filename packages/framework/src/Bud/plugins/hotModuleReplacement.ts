import {HotModuleReplacementPlugin} from 'webpack'

export const make: Framework.Extension.Make = () =>
  new HotModuleReplacementPlugin()

export const when: Framework.Extension.When = ({server}) =>
  server.config.hot == true
