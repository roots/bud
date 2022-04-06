import type { Bud,Extension} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

import {generateName, isPlugin} from './use.utilities'

const {isArray} = lodash

export interface use {
  (source: Extension.Module): Promise<Bud>
}

export interface facade {
  (source: Extension.Module): Bud
}

export const use: use = async function (source): Promise<Bud> {
  const bud = this as Bud

  const addExtension = async (source: Extension.Module): Promise<Bud> => {
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
    : await Promise.all(source.map(async ext => await addExtension(ext)))

  return bud
}
