import type {EntryObject} from '@roots/bud-framework/config'
import {isArray, isNull, isString, isUndefined} from 'lodash-es'

/**
 * Filter 'react-refresh/runtime' from entrypoint assets
 *
 * @param assets - array of assets
 * @returns assets array
 *
 * @internal
 */
const filterAssetsArray = (assets: Array<string>) =>
  assets.filter(imports => imports !== `react-refresh/runtime`)

/**
 * Adds react-refresh client script to each entrypoint
 *
 * @public
 */
export function add(
  entries: Record<string, EntryObject>,
): Record<string, EntryObject> {
  const missing = !entries || isUndefined(entries) || isNull(entries)
  const fallback = {app: {import: [`index`]}}
  entries = missing ? fallback : entries

  return Object.entries(entries).reduce((all, [name, assets]) => {
    if (isString(assets)) {
      return {...all, [name]: [`react-refresh/runtime`, assets]}
    }

    if (isArray(assets) && !assets.includes(`react-refresh/runtime`)) {
      assets.unshift(`react-refresh/runtime`)
    }

    if (!assets.import.includes(`react-refresh/runtime`)) {
      assets.import.unshift(`react-refresh/runtime`)
    }

    return {...all, [name]: assets}
  }, {})
}

/**
 * Removes react-refresh client script from each entrypoint
 *
 * @public
 */
export function remove(
  entries: Record<string, EntryObject>,
): Record<string, EntryObject> {
  return Object.entries(entries).reduce((all, [name, assets]) => {
    if (isString(assets) && assets === `react-refresh/runtime`) {
      return all
    }

    if (isArray(assets) && assets.includes(`react-refresh/runtime`)) {
      return {...all, [name]: filterAssetsArray(assets)}
    }

    assets.import = filterAssetsArray(assets.import)

    return {...all, [name]: assets}
  }, {})
}
