import type * as Webpack from '@roots/bud-support/webpack'

export type EntryObject = Webpack.EntryObject & {
  import: Array<string>
  dependOn?: string | string[]
}
