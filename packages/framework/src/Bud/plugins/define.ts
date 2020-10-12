import {DefinePlugin} from 'webpack'

export const options: OptionsFactory = bud => bud.env ?? {}

export const make: Adapter.make = (opts: Options) =>
  new DefinePlugin(opts)

export const when: Adapter.when = (_bud, opts) =>
  opts ? true : false

export type OptionsFactory = (
  bud: Framework.Bud,
) => Framework.Index<DefinePlugin.CodeValueObject>

export type Options = Framework.Index<
  DefinePlugin.CodeValueObject
>
