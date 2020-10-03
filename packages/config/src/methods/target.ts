import {Config} from '..'

export const target: Config.Target = function (target) {
  this.store['webpack'].set(
    'target',
    this.hooks.filter('api.target', target),
  )

  return this
}
