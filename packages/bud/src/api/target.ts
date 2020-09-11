import {Api} from '@roots/bud-types'

const target: Api.Target = function (target) {
  this.webpack.set(
    'target',
    this.hooks.filter('api.target', target),
  )

  return this
}

export {target}
