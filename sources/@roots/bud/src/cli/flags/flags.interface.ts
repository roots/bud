import * as oclif from '@oclif/core'

export type Option<T> = oclif.Interfaces.OptionFlag<T>
export type Boolean = oclif.Interfaces.BooleanFlag<boolean>
export type Parser<T> = oclif.Interfaces.ParseFn<T>
