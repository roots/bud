import type {Bud, Extension} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

import {generateName, isPlugin} from './use.utilities'

const {isArray} = lodash

export interface use {
  (
    source:
      | Extension.Module
      | Extension.Plugin
      | Array<Extension.Module>
      | Array<Extension.Plugin>
  ): Promise<Bud>
}

export interface facade {
  (
    source:
      | Extension.Module
      | Extension.Plugin
      | Array<Extension.Module>
      | Array<Extension.Plugin>  
  ): Bud
}

export const use: use = async function (source): Promise<Bud> {
  const bud = this as Bud

  const addExtension = async (source: Extension.Module | Extension.Plugin): Promise<Bud> => {
    if (!source) {
      bud.error(`"${source.name}" extension source is not defined`)
    }

    if (!source.hasOwnProperty('name')) {
      source.name = generateName(source)
    }

    if (bud.extensions.has(source.name)) {
      bud.info(
        `extension "${source.name}" is already registered. skipping`,
      )

      return bud
    }

    const normalized = isPlugin(source)
      ? {...source, make: () => source}
      : source
    await bud.extensions.add(normalized)
  }

  !isArray(source)
    ? await addExtension(source)
    : await Promise.all(source.map(async (ext: Extension.Module | Extension.Plugin) => await addExtension(ext)))

  return bud
}
