import type {Bud, Extension} from '@roots/bud-framework'
import type {Container} from '@roots/container'
import type Webpack from 'webpack'

export interface BudWebpackDefinePlugin
  extends Extension.Plugin<Webpack.DefinePlugin, Options> {
  label: 'webpack-define-plugin' & Extension.Plugin['label']
  make: (options: Container<Options>) => Webpack.DefinePlugin
  when: (app: Bud, options: Container<Options>) => boolean
  options: (app: Bud) => Options
}

export interface Options {
  [key: string]: string
}
