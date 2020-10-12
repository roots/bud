import {HotModuleReplacementPlugin} from 'webpack'

export const make: Adapter.make = () =>
  new HotModuleReplacementPlugin()

export const when: Adapter.when = ({store}) =>
  store['features'].enabled('hot')
