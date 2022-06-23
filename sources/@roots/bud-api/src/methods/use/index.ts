import type {Bud} from '@roots/bud-framework'
import type {
  Constructor,
  Extension,
  ExtensionLiteral,
} from '@roots/bud-framework/extension'
import {isArray, isFunction} from 'lodash-es'

import {generateName, isPlugin} from './use.utilities.js'

export interface use {
  (
    source:
      | Extension
      | Constructor
      | ExtensionLiteral
      | Array<Extension | Constructor | ExtensionLiteral>,
  ): Promise<Bud>
}

export interface facade {
  (
    source:
      | Extension
      | Constructor
      | ExtensionLiteral
      | Array<Extension | Constructor | ExtensionLiteral>,
  ): Bud
}

export const use: use = async function (source): Promise<Bud> {
  const bud = this as Bud

  const addExtension = async (
    source: Extension | Constructor | ExtensionLiteral,
  ): Promise<Bud> => {
    if (!source) {
      bud.error(`extension source is not defined`)
    }

    let instance

    if (isFunction(source)) {
      instance = new (source as Constructor)(bud)
    } else instance = source

    if (!instance.label) {
      instance.label = generateName(instance)
    }

    if (bud.extensions.has(instance.label)) {
      bud.info(
        `extension "${instance.label}" is already registered. skipping`,
      )

      return bud
    }

    if (isPlugin(instance)) instance.make = () => instance

    await bud.extensions.add(instance)
  }

  !isArray(source)
    ? await addExtension(source)
    : await Promise.all(source.map(addExtension))

  return bud
}
