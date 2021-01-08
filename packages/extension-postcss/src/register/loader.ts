import type {Loader, Module} from '@roots/bud-typings'

export const setLoader: Module.Register<Loader> = [
  'postcss-loader',
  require.resolve('postcss-loader'),
]
