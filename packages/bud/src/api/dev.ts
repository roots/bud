import type {Bud} from './types'

type Dev = (options: any) => Bud

const dev: Dev = function (options) {
  this.options.set('dev', {
    ...this.options.get('dev'),
    ...this.filter('api.dev.filter', options),
  })

  return this
}

export {dev}
export type {Dev}
