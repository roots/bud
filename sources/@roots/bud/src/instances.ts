import {Bud} from '@roots/bud'
import {
  get as _get,
  has as _has,
  set as _set,
} from '@roots/bud-support/lodash-es'

/**
 * Bud instance cache
 * @public
 */
let instances: Record<string, Bud> = {}

const get = (key?: string): Bud => {
  if (has(key)) {
    return _get(instances, key)
  }

  return set(key, new Bud())
}

const has = (key: keyof typeof instances): boolean => {
  return _has(instances, key)
}

const set = (path: string, bud: Bud) => {
  _set(instances, path, bud)
  return get(path)
}

export {get, set, has, instances}
