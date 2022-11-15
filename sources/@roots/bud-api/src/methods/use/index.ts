import type {Bud, Modules} from '@roots/bud-framework'
import type {
  Constructor,
  Extension,
  ExtensionLiteral,
} from '@roots/bud-framework/extension'

export type Parameters = [
  | Extension
  | Constructor
  | ExtensionLiteral
  | `${keyof Modules & string}`
  | Array<
      | Extension
      | Constructor
      | ExtensionLiteral
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
