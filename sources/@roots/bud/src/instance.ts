import {Bud} from '@roots/bud'
import _get from '@roots/bud-support/lodash/get'
import _has from '@roots/bud-support/lodash/has'
import _set from '@roots/bud-support/lodash/set'

let instance: Bud

const get = (): Bud => {
  if (instance) return instance

  instance = new Bud()
  return instance
}

const set = (bud: Bud) => {
  instance = bud
}

export {get, instance, set}
