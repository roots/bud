import {Bud} from '@roots/bud'
import logger from '@roots/bud-support/logger'

let instance: Bud

const get = (): Bud => {
  if (instance) {
    logger.log(`Using cached instance`)
    return instance
  }

  set(new Bud())
  return instance
}

const set = (bud: Bud) => {
  logger.log(`Instance cached to @roots/bud/instance`)
  instance = bud
}

export {get, instance as bud, instance, set}
