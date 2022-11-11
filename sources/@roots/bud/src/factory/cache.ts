import type Bud from '@roots/bud'
import {has as _has, set as _set} from '@roots/bud-support/lodash-es'

/**
 * Cached instances
 *
 * @public
 */
let instances: Record<string, Bud> = {}

const get = (key: string): Bud => {
  return instances[key]
}

const has = (key: keyof typeof instances): boolean => {
  return _has(instances, key)
}

const set = (path: string, bud: Bud) => {
  _set(instances, path, bud)
  return bud
}

export {get, has, set}
