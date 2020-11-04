export const dev: Framework.API.Dev = function (
  this: Framework.Bud,
  config,
) {
  if (!config) return this

  if (
    config.proxy?.hasOwnProperty('host') ||
    config.proxy?.hasOwnProperty('port')
  ) {
    this.features.enable('proxy')
  }

  if (config.hot) {
    this.features.enable('hot')
  }

  this.server.setConfig({
    ...this.server.getConfig(),
    ...config,
  })

  return this
}
