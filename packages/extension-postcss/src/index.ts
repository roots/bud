import {Extension} from '@roots/bud-typings'
import * as postcss from './registerItem'

export const boot: Boot = bud => {
  bud.build.rules.mutate('css.use', css => [
    ...css.splice(0, css.length - 1),
    bud.build.items.get('postcss'),
    ...css.splice(css.length - 1),
  ])
}

export const registerItem: Item = ['postcss', postcss]

export const registerLoader: Loader = [
  'postcss-loader',
  require.resolve('postcss-loader'),
]

declare type Boot = Extension.Contract['boot']

declare type Item = Extension.Contract['registerItem']

declare type Loader = Extension.Contract['registerLoader']
