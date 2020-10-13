import {HotModuleReplacementPlugin} from 'webpack'

export const make: Adapter.make = () =>
  new HotModuleReplacementPlugin()

export const when: Adapter.when = ({features}) =>
  features.enabled('hot')
