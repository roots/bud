import type {BudInterface} from '../'
import type {Configuration} from 'webpack'

type EntryBuilder = (bud: BudInterface) => Configuration['entry']

const entry: EntryBuilder = bud =>
  bud.hooks.filter('webpack.entry', {
    entry: bud.options.get('webpack.entry'),
  })

export {entry}
export type {EntryBuilder}
