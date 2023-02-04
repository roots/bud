import type {Rules} from '@roots/bud-framework'

type Source = string | RegExp | Array<string | RegExp>

export type Parameters = [Source, Array<keyof Rules & string>?]
