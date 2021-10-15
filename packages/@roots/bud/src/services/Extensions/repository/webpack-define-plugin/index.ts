import type {Extension, Framework} from '@roots/bud-framework'
import type {Container} from '@roots/container'
import {DefinePlugin} from 'webpack'

interface BudWebpackDefinePlugin
  extends Extension.CompilerPlugin<DefinePlugin, Options> {
  name: 'webpack-define-plugin' &
    Extension.CompilerPlugin['name']
  make: (options: Container<Options>) => DefinePlugin
  when: (app: Framework, options: Container<Options>) => boolean
  options: (app: Framework) => Options
}

interface Options {
  [key: string]: string
}

export const name: BudWebpackDefinePlugin['name'] =
  'webpack-define-plugin'

export const make: BudWebpackDefinePlugin['make'] = options =>
  new DefinePlugin(options.all())

export const when: BudWebpackDefinePlugin['when'] = (_, opts) =>
  opts.getEntries()?.length > 0

export const options: BudWebpackDefinePlugin['options'] = ({
  env,
  store,
}) => ({
  ...env.getPublicEnv(),
  ...store.get('extension.webpackDefinePlugin'),
})
