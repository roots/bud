import type {Bud, Extension} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

import {generateName, isPlugin} from './use.utilities'

const {isArray, isFunction} = lodash

export type Definition = Extension.Module | (new () => Extension.Extension)

export interface use {
  (
    source:
      | Definition
      | Array<Definition>
  ): Promise<Bud>
}

export interface facade {
  (
    source:
      | Definition
      | Array<Definition>
  ): Bud
}

export const use: use = async function (source): Promise<Bud> {
  const bud = this as Bud

  const addExtension = async (
    source: Definition,
  ): Promise<Bud> => {
    if (!source) {
      bud.error(`extension source is not defined`)
    }

    let instance

    if (isFunction(source)) {
      instance = new (source as any)(bud)
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
    : await Promise.all(
        source.map(
          async (ext: Definition) =>
            await addExtension(ext),
        ),
      )

  return bud
}
