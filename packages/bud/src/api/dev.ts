import {Api} from '@roots/bud-types'

const dev: Api.Dev = function (options) {
  if (options?.hasOwnProperty('enabled')) {
    this.features.set('dev', options.enabled)
  } else {
    this.features.enable('dev')
  }

  if (!options) {
    return this
  }

  this.options.merge('server', options)

  return this
}

export {dev}
