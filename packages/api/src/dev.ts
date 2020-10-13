export const dev: Api.Dev = function (config) {
  // Enable dev
  this.features.enable('dev')

  if (!config) return this

  // Enable proxy middleware
  if (config.to || config.from) {
    this.features.enable('proxy')
  }

  // Enable host middleware
  if (config.hot) {
    this.features.enable('hot')
    this.store['server']['hot'] = true
  }

  // Merge conf
  this.store['server'] = {
    ...this.store['server'],
    ...config,
  }

  return this
}
