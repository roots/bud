import type * as Webpack from 'webpack'

export type EntryObject = Webpack.EntryObject & {import: Array<string>}
