import type {Bud, Dev} from './types'

const dev: Dev = function (options: object): Bud {
  this.options.merge('dev', options)

  return this
}

export {dev}
