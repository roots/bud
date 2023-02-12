import type {Bud, Modules} from '@roots/bud-framework'
import type {Extension} from '@roots/bud-framework/extension'

export type Parameters = [
  | Extension
  | (new (bud: Bud) => Extension)
  | `${keyof Modules & string}`
  | Array<
      | Extension
      | (new (bud: Bud) => Extension)
      | `${keyof Modules & string}`
    >,
]

export interface use {
  (...source: Parameters): Promise<Bud>
}

export const use: use = async function (this: Bud, source): Promise<Bud> {
  await this.extensions.add(source)
  return this
}
