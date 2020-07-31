import type {Bud, Dev} from './types'

const dev: Dev = function (options: object): Bud {
  this.options.set('dev', {
    ...this.options.get('dev'),
    ...options,
  })

  return this
}

export {dev}
