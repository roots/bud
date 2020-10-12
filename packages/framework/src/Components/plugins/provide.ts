import {ProvidePlugin} from 'webpack'

export const options: Adapter.options = {}
export const make: Adapter.make = opts => new ProvidePlugin(opts)
