import {entry, EntryBuilder} from './entry'
import {externals, ExternalsBuilder} from './externals'
import {general, WebpackBuilder} from './general'
import {rules, ModuleBuilder} from './rules'
import {optimization, OptimizationBuilder} from './optimization'
import {output, OutputBuilder} from './output'
import {webpackResolve, ResolveBuilder} from './webpackResolve'
import {plugins, PluginsBuilder} from './plugins'

import type {BudInterface} from '../'
import type {Configuration} from 'webpack'

export type Builder = (
  bud: BudInterface,
) =>
  | EntryBuilder
  | ExternalsBuilder
  | WebpackBuilder
  | ModuleBuilder
  | OptimizationBuilder
  | OutputBuilder
  | ResolveBuilder
  | PluginsBuilder
  | Configuration

export interface Builders {
  entry: EntryBuilder
  general: WebpackBuilder
  rules: ModuleBuilder
  externals: ExternalsBuilder
  output: OutputBuilder
  optimization: OptimizationBuilder
  plugins: PluginsBuilder
  webpackResolve: ResolveBuilder
}

export const builders: Builders = {
  entry,
  general,
  rules,
  externals,
  output,
  optimization,
  plugins,
  webpackResolve,
}

export type ConfigBuilder = (bud: BudInterface) => Configuration

export const config: ConfigBuilder = (
  bud: BudInterface,
): Configuration =>
  Object.entries(builders).reduce(
    (config, [, builder]: [string, Builder]) => ({
      ...config,
      ...builder(bud),
    }),
    {},
  )
