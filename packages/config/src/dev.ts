import Bud from '@roots/bud-types'

export const dev: Bud.Config.Dev = function (config) {
  // Enable dev
  this.store['features'].enable('dev')

  if (!config) return this

  // Enable proxy middleware
  if (config.to || config.from) {
    this.store['features'].enable('proxy')
  }

  // Enable host middleware
  config.hot && this.store['features'].enable('hot')

  // Merge conf
  this.store['server'].repository = {
    ...this.store['server'],
    ...config,
  }

  return this
}
