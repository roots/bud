import type {Rules} from '@roots/bud-framework'

type Source = Array<RegExp | string> | RegExp | string

export type Parameters = [Source, Array<`${keyof Rules & string}`>?]
