import {Extension} from '@roots/bud-extensions'
import * as postcss from './registerItem'

export const boot: Boot = bud => {
  bud.build.rules.mutate('css.use', css => [
    ...css.splice(0, css.length - 2),
    bud.build.items.get('postcss'),
    ...css.splice(css.length - 2),
  ])
}

export const registerItem: Item = ['postcss', postcss]

export const registerLoader: Loader = [
  'postcss-loader',
  require.resolve('postcss-loader'),
]

declare type Boot = Extension.Interface['boot']
declare type Item = Extension.Interface['registerItem']
declare type Loader = Extension.Interface['registerLoader']
