import {Config} from '..'

export const target: Config.Target = function (target) {
  this.store['build'].set(
    'target',
    this.hooks.filter('api.target', target),
  )

  return this
}
