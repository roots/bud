import Bud from '@roots/bud-types'

export const dev: Bud.Config.Dev = function (config) {
  // Enable dev
  this.features.enable('dev')

  if (!config) return this

  // Enable proxy middleware
  if (config.to || config.from) {
    this.features.enable('proxy')
  }

  // Enable host middleware
  config.hot && this.features.enable('hot')

  // Merge conf
  this.options.merge('server', config)

  return this
}
