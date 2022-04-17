import type {Bud, Extension} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

import {generateName, isPlugin} from './use.utilities'

const {isArray, isFunction} = lodash

export interface use {
  (
    source:
      | Extension.Module
      | Extension.Constructor
      | Array<Extension.Module | Extension.Constructor>,
  ): Promise<Bud>
}

export interface facade {
  (
    source:
      | Extension.Module
      | Extension.Constructor
      | Array<Extension.Module | Extension.Constructor>,
  ): Bud
}

export const use: use = async function (source): Promise<Bud> {
  const bud = this as Bud

  const addExtension = async (
    source: Extension.Module | Extension.Constructor,
  ): Promise<Bud> => {
    if (!source) {
      bud.error(`extension source is not defined`)
    }

    let instance

    if (isFunction(source)) {
      instance = new (source as Extension.Constructor)(bud)
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
