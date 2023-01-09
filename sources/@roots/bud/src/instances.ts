import {Bud} from '@roots/bud'
import _get from '@roots/bud-support/lodash/get'
import _has from '@roots/bud-support/lodash/has'
import _set from '@roots/bud-support/lodash/set'

/**
 * Bud instance cache
 */
let instances: Record<string, Bud> = {}

const get = (key: string = process.cwd()): Bud => {
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
