import type {Bud, Modules} from '@roots/bud-framework'
import type {Extension} from '@roots/bud-framework/extension'

export type Parameters = [
  | `${keyof Modules & string}`
  | Array<
      | `${keyof Modules & string}`
      | Extension
      | (new (bud: Bud) => Extension)
    >
  | Extension
  | (new (bud: Bud) => Extension),
]

export interface use {
  (...source: Parameters): Promise<Bud>
}

export const use: use = async function (this: Bud, source): Promise<Bud> {
  await this.extensions.add(source)
  return this
}
