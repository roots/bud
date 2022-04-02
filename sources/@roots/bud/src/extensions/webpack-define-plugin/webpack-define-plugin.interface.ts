import type {Extension, Framework} from '@roots/bud-framework'
import type {Container} from '@roots/container'
import type Webpack from 'webpack'

export interface BudWebpackDefinePlugin
  extends Extension.CompilerPlugin<Webpack.DefinePlugin, Options> {
  name: 'webpack-define-plugin' & Extension.CompilerPlugin['name']
  make: (options: Container<Options>) => Webpack.DefinePlugin
  when: (app: Framework, options: Container<Options>) => boolean
  options: (app: Framework) => Options
}

export interface Options {
  [key: string]: string
}
