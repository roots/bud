import type {Bud, Alias} from './types'

const alias: Alias = function (this: Bud, options: object): Bud {
  this.options.merge('alias', options)

  return this
}

export {alias}
