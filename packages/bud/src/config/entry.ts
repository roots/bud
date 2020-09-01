import type {Bud} from '@roots/bud-typings'
import type {WebpackEntry} from '@roots/bud-typings'

type EntryBuilder = (bud: Bud) => WebpackEntry

const entry: EntryBuilder = bud =>
  bud.hooks.filter('webpack.entry', {
    entry: bud.options.get('webpack.entry'),
  })

export {entry}
export type {EntryBuilder}
