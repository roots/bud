import {Api} from '@roots/bud-typings'

const target: Api.Target = function (target) {
  this.webpack.set(
    'target',
    this.hooks.filter('api.target', target),
  )

  return this
}

export {target}
