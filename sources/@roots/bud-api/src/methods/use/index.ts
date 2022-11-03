import type {Bud, Modules} from '@roots/bud-framework'
import type {
  Constructor,
  Extension,
  ExtensionLiteral,
} from '@roots/bud-framework/extension'

export interface use {
  (
    source:
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
  ): Promise<Bud>
}

export interface facade {
  (
    source:
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
  ): Bud
}

export const use: use = async function (source): Promise<Bud> {
  const bud = this as Bud

  await bud.extensions.add(source)

  return bud
}
