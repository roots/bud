import {postcssConfig} from './api'
import {Extension} from '@roots/bud-extensions'
import * as postcss from './registerItem'

export const boot: Boot = bud => {
  bud.css = postcssConfig(bud).init()

  bud.build.rules.mutate('css.use', css => [
    ...css.splice(0, css.length - 1),
    bud.build.items.get('postcss'),
    ...css.splice(css.length - 1),
  ])
}

export const registerItem: Item = [
  postcss.ident as string,
  postcss,
]

export const registerLoader: Loader = [
  'postcss-loader',
  require.resolve('postcss-loader'),
]

declare type Boot = Extension.Interface['boot']
declare type Item = Extension.Interface['registerItem']
declare type Loader = Extension.Interface['registerLoader']
