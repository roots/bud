import type {Bud, Extension} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

import {generateName, isPlugin} from './use.utilities'

const {isArray, isFunction} = lodash

type Definition = Extension.Module | Extension.Plugin | Extension.Extension

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
      bud.error(`"${source.label}" extension source is not defined`)
    }

    if (isFunction(source)) {
      source = new (source as any)(bud)
    }

    if (!source.hasOwnProperty('label')) {
      source.label = generateName(source)
    }

    if (bud.extensions.has(source.label)) {
      bud.info(
        `extension "${source.label}" is already registered. skipping`,
      )

      return bud
    }

    if (isPlugin(source)) source.make = () => source

    await bud.extensions.add(source)
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
