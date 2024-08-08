import {Bud} from '@roots/bud-framework'

export type Parameters = [(number | string | URL)?]

export interface spa {
  (...parameters: Parameters): Bud
}

export const spa: spa = function (this: Bud, devUrl) {
  if (!this.isDevelopment) return this

  const url = devUrl ?? 3000

  this.api.logger.log(`bud.spa`, `url:`, url)

  this.setUrl(url)
  this.setProxyUrl(url)
  this.hooks.on(`dev.middleware.proxy.options.ignorePath`, true)

  return this
}
