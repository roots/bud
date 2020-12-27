import type {Loader, Module} from '@roots/bud-typings'

export const registerLoader: Module.RegisterOne<Loader> = [
  'postcss-loader',
  require.resolve('postcss-loader'),
]
