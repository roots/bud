import {Api} from '@roots/bud-types'

const alias: Api.Alias = function (option) {
  this.options.set('webpack.resolve.alias', {
    ...this.options.get('webpack.resolve.alias'),
    ...this.hooks.filter('api.alias', option),
  })

  return this
}

export {alias}
