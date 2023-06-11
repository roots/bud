import {Bud} from '@roots/bud'
import _get from '@roots/bud-support/lodash/get'
import _has from '@roots/bud-support/lodash/has'
import _set from '@roots/bud-support/lodash/set'

/**
 * bud.js instance cache
 */
let instances: Record<string, Bud> = {}

/**
 * Get a bud.js instance by key
 */
const get = (key: string = `default`): Bud => {
  if (has(key)) {
    return _get(instances, key)
  }

  return set(key, new Bud())
}

/**
 * Check if a bud.js instance exists
 */
const has = (key: keyof typeof instances): boolean => {
  return _has(instances, key)
}

/**
 * Set a bud.js instance
 */
const set = (path: string, bud: Bud) => {
  _set(instances, path, bud)
  return get(path)
}

export {get, set, has, instances}
