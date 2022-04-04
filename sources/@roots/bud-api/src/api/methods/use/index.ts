import {isArray} from './use.dependencies'
import type {Framework, Source} from './use.interface'
import {generateName, isCompilerPlugin} from './use.utilities'

export interface use {
  (source: Source): Promise<Framework>
}

export interface facade {
  (source: Source): Framework
}

export const use: use = async function (source): Promise<Framework> {
  const bud = this as Framework

  const addExtension = async (source: Source): Promise<Framework> => {
    if (!source) {
      bud.error(`extension source is not defined. skipping`)
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

    await bud.extensions.add(
      isCompilerPlugin(source) ? {...source, make: () => source} : source,
    )
  }

  !isArray(source)
    ? await addExtension(source)
    : await Promise.all(source.map(async ext => await addExtension(ext)))

  return bud
}
