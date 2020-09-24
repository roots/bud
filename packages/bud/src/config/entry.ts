import type {BudInterface} from '../'
import type {Builder} from './'
import type {Configuration} from 'webpack'

export type EntryBuilder = (
  bud: BudInterface,
) => Configuration['entry'] | Builder

export const entry: EntryBuilder = (
  bud: BudInterface,
): Configuration['entry'] =>
  bud.hooks.filter('webpack.entry', {
    entry: bud.options.get('webpack.entry'),
  })
