import type {Bud, Watch} from './types'

const watch: Watch = function (
  this: Bud,
  options: {
    paths: string[]
    enabled: boolean
  },
): Bud {
  this.features.set({
    watch: options.hasOwnProperty('enabled') ? options.enabled : true,
  })

  options?.paths && this.options.set('watch', options.paths)

  return this
}

export {watch}
