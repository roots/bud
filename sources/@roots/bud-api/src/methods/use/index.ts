import type {Bud, Modules} from '@roots/bud-framework'
import type {ApplyPlugin, Extension} from '@roots/bud-framework/extension'

export type Parameters = [
  | `${keyof Modules & string}`
  | ApplyPlugin
  | Array<`${keyof Modules & string}` | ApplyPlugin | Partial<Extension>>
  | Partial<Extension>,
]

export interface use {
  (...source: Parameters): Promise<Bud>
}

export const use: use = async function (this: Bud, source): Promise<Bud> {
  await this.extensions.add(source)
  return this
}
