import type {Bud, Dev} from './types'

const dev: Dev = function (options: any): Bud {
  this.logger.info({name: 'bud.api', function: 'bud.dev', options}, `bud.dev called`)

  this.options.set('dev', {
    ...this.options.get('dev'),
    ...this.filter('api.dev.filter', options),
  })

  return this
}

export {dev}
