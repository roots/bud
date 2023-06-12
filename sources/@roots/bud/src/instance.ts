import {Bud} from '@roots/bud'

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
