import {ProvidePlugin} from 'webpack'

export const options: Framework.Extension.Options = {}
export const make: Framework.Extension.Make = opts => new ProvidePlugin(opts)
