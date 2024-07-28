import {Bud} from '@roots/bud-framework'

export type Parameters = [(number | string | URL)?]

export interface spa {
  (...parameters: Parameters): Bud
}

export const spa: spa = function (this: Bud, devUrl) {
  if (!this.isDevelopment) {
    return this
  }

  let serverUrl = devUrl ?? this.server?.url.toString() ?? 3000

  this.api.logger.log(`bud.spa:`, `configured with`, devUrl)

  this.setUrl(serverUrl)
  this.setProxyUrl(serverUrl)
  this.hooks.on(`dev.middleware.proxy.options.ignorePath`, true)

  return this
}
