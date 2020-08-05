import type {Bud, Watch} from './types'

const watch: Watch = function (
  this: Bud,
  options: {
    paths: string[]
    enabled: boolean
  },
): Bud {
  this.logger.info({name: 'bud.api', function: 'bud.watch', ...options}, `bud.watch called`)

  options?.enabled && this.features.enable('watch')
  options?.paths && this.options.set('watch', this.hooks.filter('api.watch.filter', options.paths))

  return this
}

export {watch}
