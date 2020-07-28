import type {Bud, Alias} from './types'

const alias: Alias = function (this: Bud, options: object): Bud {
  this.state.options.alias = options

  return this
}

export {alias}
