import type {Bud, Watch} from './types'

const watch: Watch = function (
  this: Bud,
  options: {
    paths: string[]
    enabled: boolean
  },
): Bud {
  options?.enabled && this.features.enable('watch')
  options?.paths &&
    this.options.set(
      'watch',
      this.hooks.filter('api.watch', options.paths),
    )

  return this
}

export {watch}
