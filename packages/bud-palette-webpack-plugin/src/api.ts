import type {Bud} from '@roots/bud'

const api = function (this: Bud, blacklist: string[]): Bud {
  this.options.set('palette-blacklist', blacklist)

  return this
}

export {api}
