import type { Extension, Framework} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

import {generateName, isCompilerPlugin} from './use.utilities'

const {isArray} = lodash

export interface use {
  (source: Extension.Module): Promise<Framework>
}

export interface facade {
  (source: Extension.Module): Framework
}

export const use: use = async function (source): Promise<Framework> {
  const bud = this as Framework

  const addExtension = async (source: Extension.Module): Promise<Framework> => {
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

    const normalized = isCompilerPlugin(source)
      ? {...source, make: () => source}
      : source
    await bud.extensions.add(normalized)
  }

  !isArray(source)
    ? await addExtension(source)
    : await Promise.all(source.map(async ext => await addExtension(ext)))

  return bud
}
